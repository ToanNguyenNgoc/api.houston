import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios'
import { InjectRepository } from '@nestjs/typeorm';
import { District, Province, Ward } from './entities';
import { Repository } from 'typeorm';
import { QueryMapDTO } from './dto';
import { MapBoxResponse, MaxBoxFeature } from '../../interface';
import { RedisCacheService } from 'src/redis';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(Province)
    private readonly provinceRe: Repository<Province>,
    @InjectRepository(District)
    private readonly districtRe: Repository<District>,
    @InjectRepository(Ward)
    private readonly wardRe: Repository<Ward>,
    private readonly cache: RedisCacheService
  ) { }
  async findAll() {
    if (await this.cache.get('PROVINCES')) {
      return { data: await this.cache.get('PROVINCES') }
    }
    const response = await this.provinceRe
      .createQueryBuilder('tb_province')
      .getManyAndCount()
    await this.cache.set<Province[]>('PROVINCES', response[0])
    if (response[1] === 0) {
      const provincesApi = await axios.get('https://provinces.open-api.vn/api/?depth=1')
      await this.provinceRe
        .createQueryBuilder('tb_branch')
        .insert()
        .into(Province)
        .values(provincesApi.data)
        .execute()
      return { data: provincesApi.data }
    }
    return { data: response[0] }
  }
  async findDistrictsByProvince(id: string) {
    const districtsCount = await this.districtRe
      .createQueryBuilder('tb_districts')
      .getCount()
    if (districtsCount === 0) {
      const provincesApi = await axios.get('https://provinces.open-api.vn/api/?depth=2')
      const districts = provincesApi.data.map((item: any) => item.districts).flat()
      await this.districtRe.createQueryBuilder('tb_district')
        .insert()
        .into(District)
        .values(districts)
        .execute()
      return { data: districts.filter((item: any) => item.province_code == id) }
    }
    const response = await this.districtRe.createQueryBuilder('tb_district')
      .where({ province_code: id })
      .getMany()
    return { data: response }
  }
  async findWards(district_code) {
    const wardCount = await this.wardRe.createQueryBuilder('tb_ward').getCount()
    if (wardCount === 0) {
      const wardsApi = await axios.get('https://provinces.open-api.vn/api/w/')
      await this.wardRe.createQueryBuilder('tb_ward')
        .insert()
        .into(Ward)
        .values(wardsApi.data)
        .execute()
      return { data: wardsApi.data }
    }
    return {
      data: await this.wardRe
        .createQueryBuilder('tb_ward')
        .where({ district_code: district_code })
        .getMany()
    }
  }
  async getPlaces(query: QueryMapDTO) {
    try {
      if (query.search_type === 'address') {
        const response = await axios
          .get<MapBoxResponse>(
            `${process.env.MAP_BOX_API_URL}/${query.search}.json?access_token=${process.env.MAP_BOX_ACCESS_TOKEN}&language=vi&country=vn`,
          ).then(res => res.data)
        const data = response?.features?.map((f: MaxBoxFeature) => {
          return {
            ...f,
            center: f.center?.reverse(),
            geometry: { type: f.geometry?.type, coordinates: f.geometry?.coordinates?.reverse() }
          }
        })
        return { data: data }
      }
      if (query.search_type === 'coord') {
        const coords = query.search?.split(',')?.reverse()?.join(',')
        const response = await axios
          .get<MapBoxResponse>(
            `${process.env.MAP_BOX_API_URL}/${coords}.json?access_token=${process.env.MAP_BOX_ACCESS_TOKEN}&language=vi&country=vn`,
          ).then(res => res.data)
        const data = response?.features?.map((f: MaxBoxFeature) => {
          const place_name_vi_trans = f.context?.
            map(i => Number.isNaN(parseInt(i.text_vi)) ? i.text_vi : '')
            .filter(String)
            .join(', ')
          return {
            ...f,
            place_name_vi_trans: place_name_vi_trans,
            center: f.center?.reverse(),
            geometry: { type: f.geometry?.type, coordinates: f.geometry?.coordinates?.reverse() }
          }
        })
        return { data: data }
      }
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }
}
