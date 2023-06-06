/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentGateway } from 'src/api/payment_gateway/entities';
import { Brackets, Repository } from 'typeorm';
import * as moment from "moment";
import { createHmac } from "crypto";
import axios from "axios";
import { Request, Response, query } from "express"
import { Booking } from 'src/api/booking/entities';
import { RequestHeader } from 'src/interface';
import { Customer } from 'src/api/customer/entities';
import { QueryVnpay } from 'src/api/payment_gateway/dto';

@Injectable()
export class PaymentGatewayService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRe: Repository<Booking>,

    @InjectRepository(PaymentGateway)
    private readonly paymentGatewayRe: Repository<PaymentGateway>
  ) { }
  async updateStatus(req: Request, query: any, res: Response) {
    process.env.TZ = 'Asia/Ho_Chi_Minh'
    const callbackUrl = process.env.VN_PAY_CALLBACK_URL
    const date = new Date()
    const vnp_TmnCode = process.env.VN_TMN_CODE;
    const secretKey = process.env.VN_SECRET_KEY;
    const vnp_Api = process.env.VN_PAY_API;

    const vnp_TxnRef = query.vnp_TxnRef;
    const vnp_TransactionDate = query.vnp_PayDate;
    const vnp_RequestId = moment(date).format('HHmmss');
    const vnp_Version = '2.1.0';
    const vnp_Command = 'querydr';
    const vnp_OrderInfo = 'Truy van GD ma:' + vnp_TxnRef;

    // const vnp_IpAddr = req.headers['x-forwarded-for'] ||
    //   req.connection.remoteAddress ||
    //   req.socket.remoteAddress
    const vnp_IpAddr = '::1'
    const currCode = 'VND';
    const vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');
    const data = vnp_RequestId + "|" + vnp_Version + "|" + vnp_Command + "|" + vnp_TmnCode + "|" + vnp_TxnRef + "|" + vnp_TransactionDate + "|" + vnp_CreateDate + "|" + vnp_IpAddr + "|" + vnp_OrderInfo;
    const hmac = createHmac("sha512", secretKey);
    const vnp_SecureHash = hmac.update(new Buffer(data, 'utf-8')).digest("hex");
    const dataObj = {
      'vnp_RequestId': vnp_RequestId,
      'vnp_Version': vnp_Version,
      'vnp_Command': vnp_Command,
      'vnp_TmnCode': vnp_TmnCode,
      'vnp_TxnRef': vnp_TxnRef,
      'vnp_OrderInfo': vnp_OrderInfo,
      'vnp_TransactionDate': vnp_TransactionDate,
      'vnp_CreateDate': vnp_CreateDate,
      'vnp_IpAddr': vnp_IpAddr,
      'vnp_SecureHash': vnp_SecureHash
    };
    const qb = this.paymentGatewayRe.createQueryBuilder('tb_payment_gateway')
      .update(PaymentGateway)
      .where({ txn_ref: vnp_TxnRef })
    const result = await axios.post(vnp_Api, dataObj)
    if (result.data.vnp_TransactionStatus === "00") {
      await qb.set({ status: 'SUCCESS' }).execute()
    } else {
      await qb.set({ status: 'CANCEL' }).execute()
    }
    // return res.redirect(`${callbackUrl}?vnp_TxnRef=${vnp_TxnRef}&vnp_Transaction=${vnp_TransactionDate}`)
    return res.redirect(`${callbackUrl}?txn_ref=${vnp_TxnRef}`)
  }
  async status(req: RequestHeader<Customer>, qr: QueryVnpay) {
    const qb = this.bookingRe.createQueryBuilder('tb_booking')
      .leftJoinAndSelect('tb_booking.payment_gateway', 'tb_payment_gateway')
      .where('tb_payment_gateway.txn_ref =:txn_ref', { txn_ref: qr.txn_ref })
      .leftJoin('tb_booking.customer', 'tb_customer')
      .addSelect(['tb_customer.id', 'tb_customer.fullname'])
      .andWhere(
        new Brackets((qb) => qb.where('tb_customer.id =:id', { id: req.user.id }))
      )
      .leftJoinAndSelect('tb_booking.branch', 'tb_branch')
      .leftJoinAndSelect('tb_booking.villa', 'tb_villa')
      .leftJoinAndSelect('tb_branch.province', 'tb_province')
      .leftJoinAndSelect('tb_branch.district', 'tb_district')
      .leftJoinAndSelect('tb_branch.ward', 'tb_ward')
      .leftJoinAndSelect('tb_villa.thumbnail', 'tb_media')
      .leftJoinAndSelect('tb_booking.payment_method', 'tb_payment_method')
    const response = await qb.getOne()
    if (!response) throw new NotFoundException("Cannot found")
    return { data: response }
  }
}
