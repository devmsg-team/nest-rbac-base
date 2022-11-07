import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import { customAlphabet, nanoid } from 'nanoid';
import { Request } from 'express';
import axios from 'axios';
import * as iconv from 'iconv-lite';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SharedService {
  constructor(private configService: ConfigService) { }
  arrToTree(data: any[], parentId: number) {
    let result = [], temp;
    const length = data.length;
    for (let i = 0; i < length; i++) {
      if (parseInt(data[i].parentId) === parentId) {
        result.push(data[i]);
        temp = this.arrToTree(data, parseInt(data[i].id));
        if (temp.length > 0) {
          data[i].children = temp;
        }
      }
    }
    return result;
  }

  /* 获取请求IP */
  getReqIP(req: Request): string {
    return (
      // 判断是否有反向代理 IP
      (
        (req.headers['x-forwarded-for'] as string) ||
        // 判断后端的 socket 的 IP
        req.socket.remoteAddress ||
        ''
      ).replace('::ffff:', '')
    );
  }

  /* 判断IP是不是内网 */
  IsLAN(ip: string) {
    ip.toLowerCase();
    if (ip == 'localhost') return true;
    let a_ip = 0;
    if (ip == '') return false;
    const aNum = ip.split('.');
    if (aNum.length != 4) return false;
    a_ip += parseInt(aNum[0]) << 24;
    a_ip += parseInt(aNum[1]) << 16;
    a_ip += parseInt(aNum[2]) << 8;
    a_ip += parseInt(aNum[3]) << 0;
    a_ip = (a_ip >> 16) & 0xffff;
    return (
      a_ip >> 8 == 0x7f ||
      a_ip >> 8 == 0xa ||
      a_ip == 0xc0a8 ||
      (a_ip >= 0xac10 && a_ip <= 0xac1f)
    );
  }

  /* 通过ip获取地理位置 */
  async getLocation(ip: string) {
    if (this.IsLAN(ip)) return '内网IP';
    try {
      let { data } = await axios.get(
        `http://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`,
        { responseType: 'arraybuffer' },
      );
      data = JSON.parse(iconv.decode(data, 'gbk'));
      return data.pro + ' ' + data.city;
    } catch (error) {
      return '未知';
    }
  }

  /**
   * @description: AES加密
   * @param {string} msg
   * @param {string} secret
   * @return {*}
   */
  aesEncrypt(msg: string): string {
    return CryptoJS.AES.encrypt(msg, this.configService.get('jwt.secret')).toString();
  }

  /**
   * @description: AES解密
   * @param {string} encrypted
   * @param {string} secret
   * @return {*}
   */
  aesDecrypt(encrypted: string): string {
    return CryptoJS.AES.decrypt(encrypted, this.configService.get('jwt.secret')).toString(CryptoJS.enc.Utf8);
  }

  /**
   * @description: md5加密
   * @param {string} msg
   * @return {*}
   */
  md5(msg: string): string {
    return CryptoJS.MD5(msg).toString();
  }

  /**
   * @description: 生成一个UUID
   * @param {*}
   * @return {*}
   */
  generateUUID(): string {
    return nanoid();
  }

  /**
   * @description: 生成一个随机字符串
   * @param {number} length
   * @param {*} placeholder
   * @return {*}
   */
  generateRandomValue(
    length: number,
    placeholder = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
  ): string {
    const customNanoid = customAlphabet(placeholder, length);
    return customNanoid();
  }
}
