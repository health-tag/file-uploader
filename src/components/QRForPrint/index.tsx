import React from "react";
import QRCode from "react-qr-code";

const APP_URL = process.env.REACT_APP_USER_URL

export class QRForPrint extends React.PureComponent<
  {
    uuid: string;
    createdAt: string;
    expiredAt: string;
    ref: React.RefObject<QRForPrint>;
  },
  {}
> {
  render() {
    const { uuid, createdAt, expiredAt } = this.props;
    return (
      <div className="bg-white flex flex-col items-center" style={{fontSize:`14px`}}>
        <QRCode value={`${APP_URL}?u=${uuid}`} size={128} />
        <div className="mt-3">QR นี้ใช้ได้ตั้งแต่</div>
        <div>
          {createdAt}
        </div>
        <div>ถึง</div>
        <div className="mb-3">
          {expiredAt}
        </div>
        <div className="text-sm font-bold text-center">
          หากใส่ PIN ผิดเกิน 3 ครั้ง <br/> QR นี้ไม่สามารถใช้งานได้อีก
        </div>
      </div>
    );
  }
}
