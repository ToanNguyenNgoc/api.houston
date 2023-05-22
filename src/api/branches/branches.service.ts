import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Like, Repository } from 'typeorm';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Branch } from './entities';
import { TransformData } from '../../interface'
import { QueryBranchDTO } from './dto';
import { convertBoolean } from '../../utils'
import { transformResponse } from '../../common';
import { District, Province, Ward } from '../province/entities';
import { Media } from '../media/entities';
import { Villa } from '../villa/entities';
import { VillaGallery } from '../villa_gallery/entities';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    @InjectRepository(Ward)
    private readonly wardRepository: Repository<Ward>,
    @InjectRepository(Villa)
    private readonly villaRepository: Repository<Villa>,
    @InjectRepository(VillaGallery)
    private readonly villaGalleryRe: Repository<VillaGallery>
  ) { }
  async create(body: CreateBranchDto): Promise<TransformData<Branch>> {
    const province = await this.provinceRepository
      .createQueryBuilder('tb_province')
      .where({ code: body.province_code })
      .getOne()
    if (!province) throw new NotFoundException('Cannot found province')

    const district = await this.districtRepository
      .createQueryBuilder('tb_district')
      .where({ code: body.district_code })
      .getOne()
    if (!province) throw new NotFoundException('Cannot found district')

    const ward = await this.wardRepository
      .createQueryBuilder('tb_ward')
      .where({ code: body.ward_code })
      .getOne()
    if (!province) throw new NotFoundException('Cannot found ward')
    const media = await this.mediaRepository
      .createQueryBuilder('tb_media')
      .where({ id: body.media_id }).getOne()

    const branch = new Branch()
    branch.name = body.name
    branch.image = media
    branch.content = body.content
    branch.description = body.description
    branch.address = body.address
    branch.province = province
    branch.district = district
    branch.ward = ward
    branch.latitude = body.lat
    branch.longitude = body.lng
    const response = await this.branchRepository.save(branch)
    return { data: response }
  }

  async findAll(query: QueryBranchDTO): Promise<TransformData<Branch[]>> {
    const page = parseInt(`${query.page ?? 1}`)
    const limit = parseInt(`${query.limit ?? 15}`)
    const response = await this.branchRepository
      .createQueryBuilder('tb_branch')
      .leftJoin('tb_branch.image', 'tb_media')
      .addSelect(['tb_media.original_url'])
      .leftJoinAndSelect('tb_branch.ward', 'tb_ward')
      .leftJoinAndSelect('tb_branch.district', 'tb_district')
      .leftJoinAndSelect('tb_branch.province', 'tb_province')
      .where(query.status ? { status: convertBoolean(query.status) } : {})
      .andWhere({ deleted: false })
      .andWhere(new Brackets((qb) => qb.where(
        query.province_code ? 'tb_province.code =:code' : '',
        query.province_code ? { code: query.province_code } : {}
      )))
      .andWhere(new Brackets((qb) => qb.where(
        query.district_code ? 'tb_district.code =:code' : '',
        query.district_code ? { code: query.district_code } : {}
      )))
      .andWhere(new Brackets((qb) => qb.where(
        query.ward_code ? 'tb_ward.code =:code' : '',
        query.ward_code ? { code: query.ward_code } : {}
      )))
      .andWhere(
        new Brackets((qb) => {
          qb.where({ name: Like(`%${query.search ?? ''}%`) })
        }),
      )
      .offset((page * limit) - limit)
      .limit(limit)
      .getManyAndCount()
    return transformResponse<Branch[]>(response[0], response[1], page, limit)
  }

  async findOne(id: number): Promise<TransformData<Branch>> {
    try {
      const response = await this.branchRepository
        .createQueryBuilder('tb_branch')
        .where({ id: id })
        .andWhere({ deleted: false })
        .andWhere({ status: true })
        .leftJoin('tb_branch.image', 'tb_media')
        .addSelect(['tb_media.original_url'])
        .leftJoinAndSelect('tb_branch.ward', 'tb_ward')
        .leftJoinAndSelect('tb_branch.district', 'tb_district')
        .leftJoinAndSelect('tb_branch.province', 'tb_province')
        .getOne()
      if (!response) {
        throw new NotFoundException('Can not found')
      }
      return { data: response }
    } catch (error) {
      throw new NotFoundException('Can not found')
    }
  }
  async update(id: string, body: UpdateBranchDto) {
    let province
    if (body.province_code) {
      const provinceResponse = await this.provinceRepository
        .createQueryBuilder('tb_province')
        .where({ code: body.province_code })
        .getOne()
      if (!provinceResponse) throw new NotFoundException('Cannot found province')
      province = provinceResponse
    }
    let district
    if (body.district_code) {
      const districtResponse = await this.districtRepository
        .createQueryBuilder('tb_district')
        .where({ code: body.district_code })
        .getOne()
      if (!districtResponse) throw new NotFoundException('Cannot found district')
      district = districtResponse
    }
    let ward
    if (body.ward_code) {
      const wardResponse = await this.wardRepository
        .createQueryBuilder('tb_ward')
        .where({ code: body.ward_code })
        .getOne()
      if (!wardResponse) throw new NotFoundException('Cannot found ward')
      ward = wardResponse
    }
    const media = await this.mediaRepository
      .createQueryBuilder('tb_media')
      .where({ id: body.media_id }).getOne()
    await this.branchRepository.createQueryBuilder('tb_branch')
      .update(Branch)
      .where({ id: id })
      .set({
        name: body.name,
        image: media ? media : undefined,
        content: body.content,
        description: body.description,
        status: body.status,
        address: body.address,
        province: province,
        district: district,
        ward: ward,
        latitude: body.lat,
        longitude: body.lng
      })
      .execute()
    return { message: 'Update success !' };
  }

  async remove(id: string) {
    await this.branchRepository
      .createQueryBuilder('tb_branch')
      .update(Branch)
      .where({ id: id })
      .set({ deleted: true })
      .execute()
    return { message: 'Delete success !' };
  }

  async findGalleriesById(id: string) {
    try {
      const branchMedia = await this.branchRepository
        .createQueryBuilder('tb_branch')
        .where({ id: id, status: true, deleted: false })
        .select(['tb_branch.id'])
        .leftJoinAndSelect('tb_branch.image', 'tb_media')
        .getOne()
      const villas = await this.villaRepository
        .createQueryBuilder('tb_villa')
        .where({ status: true, deleted: false })
        .leftJoinAndSelect('tb_villa.branch', 'tb_branch')
        .leftJoinAndSelect('tb_villa.thumbnail', 'tb_media')
        .andWhere(
          new Brackets((qb) => qb.where('tb_branch.id =:branch_id', { branch_id: id }))
        )
        .getMany()
      const villas_id = villas.map(i => i.id)
      let galleries = []
      if (villas_id.length > 0) {
        const villasGalleries = await this.villaGalleryRe
          .createQueryBuilder('tb_villa_gallery')
          .leftJoin('tb_villa_gallery.villa', 'tb_villa')
          .addSelect('tb_villa.id')
          .where('tb_villa.id IN (:...villas_id)', { villas_id: villas_id })
          .leftJoinAndSelect('tb_villa_gallery.image', 'tb_media')
          .getMany()
        galleries = villasGalleries
      }
      const data = [
        branchMedia,
        ...villas.map(i => {
          return {
            id: i.id,
            type: 'IMAGE_VILLA',
            image: i.thumbnail
          }
        }).filter(i => i.image !== null),
        ...galleries.map(i => { return { type: 'GALLERY_VILLA', ...i, } })
      ]
      return { data: data.filter(Boolean) }
    } catch (error) {
      throw new BadGatewayException(`${error}`)
    }
  }

}
