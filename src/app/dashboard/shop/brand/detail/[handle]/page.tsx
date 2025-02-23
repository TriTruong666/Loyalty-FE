"use client";
import { formatPrice } from "@/app/utils/format";
import DOMPurify from "isomorphic-dompurify";
import { Accordion, AccordionItem, Button } from "@heroui/react";
import Image from "next/image";
const longHTML = `
<p>Easydew Ex UV Control Velvet Primer là kem chống nắng trong suốt có kết cấu mỏng nhẹ nên dễ thẩm thấu vào da, không gây nhờn rít. Kem chống nắng trong suốt không chứa các thành phần tạo màu nên không để lại vệt trắng trên da.Thích hợp cho mọi loại da, kể cả da nhạy cảm. Phù hợp với da dầu. Có thể sử dụng trước khi trang điểm để lớp nền được mềm mịn và không bị lộ lỗ chân lông.</p><p><br><strong>1. Công dụng:</strong></p><p>- Chống nắng với chỉ số SPF 40+ bảo vệ da tránh khỏi 97% tia UVB tác động của ánh sáng mặt trời</p><p>- PA+++ bảo vệ da tối ưu 90% tia UVA</p><p>- Không gây bếch rít</p><p>- Làm lớp lót trang điểm, giúp da mịn màng và đều màu.</p><p>- Kiềm dầu, giúp da khô thoáng suốt cả ngày.</p><p>- Se khít lỗ chân lông, giúp da mịn màng.</p><p>&nbsp;</p><p><strong>2.&nbsp;Thành phần:</strong></p><p>- DW-EGF (1ppm), Tocopherol, Salicylic Acid, Hexanediol, Ceramide,...</p><p>&nbsp;</p><p><strong>3. Hướng dẫn sử dụng</strong></p><p>- Thoa kem chống nắng 20 phút trước khi ra ngoài trời giúp&nbsp;kem chống nắng có thời gian để thẩm thấu vào da.<br>-&nbsp; Nên thoa lại kem chống nắng sau mỗi 2 giờ, hoặc thường xuyên hơn nếu đổ mồ hôi hay&nbsp;bơi lội.<br>- Tẩy trang kỹ sau khi sử dụng kem chống nắng giúp làm sạch lớp kem chống nắng.</p><p>&nbsp;</p><p><strong>Lưu ý của Picare :</strong></p><p>● Không sử dụng trên các khu vực có bất thường như vết thương, vết sưng tấy hoặc phát ban.</p><p>● Nếu bạn gặp bất kỳ dấu hiệu bất thường nào như mẩn đỏ, sưng tấy, ngứa ngáy, kích ứng, mất màu (đốm trắng, v.v.) và sạm da trong hoặc sau khi sử dụng, hoặc nếu da bạn tiếp xúc trực tiếp với ánh nắng mặt trời thì có thể xảy ra những bất thường trên. xảy ra, ngưng sử dụng và hỏi ý kiến ​​bác sĩ da liễu.</p><p>&nbsp;</p><p>Dung tích: 40ml.</p><p>Xuất xứ thương hiệu: Hàn Quốc.</p><p>Sản xuất tại: Hàn Quốc.</p><p>Nhà sản xuất: COSMAX.INC - KOREA.</p><p>Chịu trách nhiệm đưa sản phẩm ra thị trường : Công ty TNHH&nbsp;Picare Việt Nam.</p>
`;
const instruction = `<p style="text-align: left;color: rgb(255, 255, 255);background-color: rgb(0, 0, 0);font-size: 16px;font-family: Roboto, sans-serif;"><span style="font-size: 12pt;">Hướng dẫn mua h&agrave;ng</span></p>
<p style="text-align: left;color: rgb(45, 45, 45);background-color: rgb(255, 255, 255);font-size: 16px;font-family: Roboto, sans-serif;"><span style="font-size: 11pt;">Shop Dược Mỹ Phẩm https://shopduocmypham.com được quản l&yacute; vận h&agrave;nh bởi C&ocirc;ng ty TNHH Dược Phẩm Trung Hanh &ndash; Trung Hanh Pharma Co., Ltd.</span></p>
<h2 style="text-align: left;color: rgb(45, 45, 45);background-color: rgb(255, 255, 255);font-size: 2rem;font-family: Roboto, sans-serif;"><span style="font-size: 12pt;"><strong>Đặt h&agrave;ng</strong></span></h2>
<p style="text-align: left;color: rgb(45, 45, 45);background-color: rgb(255, 255, 255);font-size: 16px;font-family: Roboto, sans-serif;"><br><span style="font-size: 11pt;">Sau khi lựa chọn sản phẩm muốn mua cho v&agrave;o giỏ h&agrave;ng, Shop Dược Mỹ Phẩm sẽ t&iacute;nh tổng số tiền phải trả bao gồm cả Thuế, ph&iacute; giao h&agrave;ng, Bạn kh&ocirc;ng phải trả th&ecirc;m bất kỳ khoản n&agrave;o kh&aacute;c ngo&agrave;i số tiền h&oacute;a đơn cho d&ugrave; Bạn thực hiện thanh to&aacute;n online d&ugrave;ng thẻ t&iacute;n dụng hay chọn thanh to&aacute;n khi nhận h&agrave;ng. Bạn n&ecirc;n kiểm tra kỹ lưỡng c&aacute;c th&ocirc;ng tin trước khi gửi đơn h&agrave;ng đi.<br></span><span style="font-size: 11pt;">Khi Bạn thực hiện thanh to&aacute;n online, Bạn phải l&agrave; người c&oacute; đầy đủ quyền sử dụng hợp ph&aacute;p thẻ/t&agrave;i khoản thanh to&aacute;n v&agrave; phải c&oacute; đủ số tiền để trả cho giao dịch mua h&agrave;ng khi thực hiện đặt h&agrave;ng tr&ecirc;n Shop Dược Mỹ Phẩm.</span></p>
<h2 style="text-align: left;color: rgb(45, 45, 45);background-color: rgb(255, 255, 255);font-size: 2rem;font-family: Roboto, sans-serif;"><span style="font-size: 12pt;"><strong>X&aacute;c nhận đơn h&agrave;ng</strong></span></h2>
<p style="text-align: left;color: rgb(45, 45, 45);background-color: rgb(255, 255, 255);font-size: 16px;font-family: Roboto, sans-serif;"><strong><span style="font-size: 11pt;"><br></span></strong><span style="font-size: 11pt;">Đơn h&agrave;ng của Bạn ch&iacute;nh thức được thực hiện khi Ch&uacute;ng t&ocirc;i gửi đến Bạn &quot;X&aacute;c nhận đơn h&agrave;ng&quot; qua email với th&ocirc;ng tin sản phẩm v&agrave; m&atilde; số đơn h&agrave;ng. Ch&uacute;ng t&ocirc;i c&oacute; tr&aacute;ch nhiệm phải cung cấp sản phẩm cho Bạn theo y&ecirc;u cầu trong đơn đặt h&agrave;ng. Trước khi c&oacute; X&aacute;c nhận đơn h&agrave;ng do Ch&uacute;ng t&ocirc;i gửi đến Bạn, ch&uacute;ng t&ocirc;i c&oacute; quyền từ chối tiến h&agrave;nh đơn h&agrave;ng v&igrave; những l&yacute; do kh&aacute;ch quan (tạm hết h&agrave;ng, th&ocirc;ng tin người mua chưa x&aacute;c thực) v&agrave; Bạn c&oacute; quyền hủy đơn h&agrave;ng. Trong v&ograve;ng 48 giờ sau khi Bạn đặt h&agrave;ng m&agrave; Bạn chưa nhận được X&aacute;c nhận đơn h&agrave;ng th&igrave; đơn h&agrave;ng của Bạn xem như bị hủy, Bạn c&oacute; thể từ chối nhận h&agrave;ng cho d&ugrave; được giao h&agrave;ng.</span></p>
<h2 style="text-align: left;color: rgb(45, 45, 45);background-color: rgb(255, 255, 255);font-size: 2rem;font-family: Roboto, sans-serif;"><span style="font-size: 12pt;"><strong>Sửa đổi đơn h&agrave;ng, hủy đơn h&agrave;ng</strong></span></h2>
<p style="text-align: left;color: rgb(45, 45, 45);background-color: rgb(255, 255, 255);font-size: 16px;font-family: Roboto, sans-serif;"><br><span style="font-size: 11pt;">Nếu Bạn muốn thay đổi đơn hay hủy đơn h&agrave;ng của m&igrave;nh sau khi đ&atilde; gửi đơn h&agrave;ng đi, vui l&ograve;ng li&ecirc;n hệ đến 0918 088 123 hoặc email myphameucerin@gmail.com ngay lập tức để được hỗ trợ. Tuy nhi&ecirc;n, ch&uacute;ng t&ocirc;i kh&ocirc;ng cam kết rằng ch&uacute;ng t&ocirc;i c&oacute; thể sửa đổi theo tất cả mọi y&ecirc;u cầu của bạn. Trong đa số trường hợp nếu đơn h&agrave;ng của Bạn chưa được giao cho Nh&agrave; vận chuyển th&igrave; Ch&uacute;ng t&ocirc;i sẽ đ&aacute;p ứng y&ecirc;u cầu của Bạn.</span></p>
<h2 style="text-align: left;color: rgb(45, 45, 45);background-color: rgb(255, 255, 255);font-size: 2rem;font-family: Roboto, sans-serif;"><span style="font-size: 12pt;"><strong>Sản phẩm bị lỗi</strong></span></h2>
<p style="text-align: left;color: rgb(45, 45, 45);background-color: rgb(255, 255, 255);font-size: 16px;font-family: Roboto, sans-serif;"><br><span style="font-size: 11pt;">Shop Dược Mỹ Phẩm cam kết cung cấp h&agrave;ng ch&iacute;nh h&atilde;ng v&agrave; đảm bảo rằng sản phẩm được giao nguy&ecirc;n vẹn, đ&uacute;ng số lượng đ&atilde; đặt v&agrave; đ&uacute;ng hướng dẫn sử dụng đ&atilde; c&ocirc;ng bố tr&ecirc;n trang web hoặc tr&ecirc;n sản phẩm tại thời điểm Bạn đặt h&agrave;ng.<br></span><span style="font-size: 11pt;">Mọi sản phẩm đều c&oacute; hướng dẫn sử dụng ngay tr&ecirc;n sản phẩm. Đề nghị Bạn đọc kỹ v&agrave; l&agrave;m theo hướng dẫn sử dụng đ&oacute;.<br></span><span style="font-size: 11pt;">Shop Dược Mỹ Phẩm lu&ocirc;n cố gắng để giao sản phẩm trong t&igrave;nh trạng tốt nhất, nhưng trong một số rất &iacute;t trường hợp, nếu Bạn ph&aacute;t hiện sản phẩm bị lỗi, vui l&ograve;ng giữ nguy&ecirc;n t&igrave;nh trạng sản phẩm l&uacute;c đ&oacute; v&agrave; li&ecirc;n lạc ngay với Ch&uacute;ng t&ocirc;i để c&oacute; c&aacute;ch xử l&yacute; tốt nhất.<br></span><span style="font-size: 11pt;">Bạn vui l&ograve;ng hợp t&aacute;c bằng c&aacute;ch cung cấp th&ocirc;ng tin ch&iacute;nh x&aacute;c để ch&uacute;ng t&ocirc;i c&oacute; thể giải quyết trường hợp sản phẩm bị lỗi. C&aacute;c th&ocirc;ng tin cần thiết bao gồm: Th&ocirc;ng tin về m&atilde; đơn h&agrave;ng v&agrave; c&aacute;c th&ocirc;ng tin kh&aacute;c li&ecirc;n quan đến việc mua h&agrave;ng tại trang web của ch&uacute;ng t&ocirc;i c&ugrave;ng với th&ocirc;ng tin (c&oacute; thể bao gồm h&igrave;nh chụp) chứng minh sản phẩm bị lỗi.<br></span><span style="font-size: 11pt;">Shop Dược Mỹ Phẩm sẽ kh&ocirc;ng &aacute;p dụng ch&iacute;nh s&aacute;ch ho&agrave;n tiền v&agrave; đền b&ugrave; nếu ch&uacute;ng t&ocirc;i ph&aacute;t hiện sản phẩm đ&atilde; bị:</span></p>
<ul style="text-align: left;color: rgb(45, 45, 45);background-color: rgb(255, 255, 255);font-size: 16px;font-family: Roboto, sans-serif;">
    <li><span style="font-size: 11pt;">Sử dụng sai, hư hỏng do bất cẩn, kh&ocirc;ng bảo quản đ&uacute;ng quy c&aacute;ch, hoặc bị hư hại trong t&igrave;nh trạng kh&ocirc;ng b&igrave;nh thường do tai nạn, thi&ecirc;n tai, do chủ &yacute; thay đổi, chỉnh sửa.</span></li>
    <li><span style="font-size: 11pt;">Sử dụng kh&ocirc;ng đ&uacute;ng hướng dẫn của Nh&agrave; sản xuất;</span></li>
    <li><span style="font-size: 11pt;">Bị hao m&ograve;n do được sử dụng hoặc bị x&eacute; tem.</span></li>
</ul>
<h2 style="text-align: left;color: rgb(45, 45, 45);background-color: rgb(255, 255, 255);font-size: 2rem;font-family: Roboto, sans-serif;"><span style="font-size: 12pt;"><strong>Khiếu nại</strong></span></h2>
<p style="text-align: left;color: rgb(45, 45, 45);background-color: rgb(255, 255, 255);font-size: 16px;font-family: Roboto, sans-serif;"><span style="font-size: 11pt;"><br></span><span style="font-size: 11pt;">Bạn c&oacute; thể li&ecirc;n hệ với chung t&ocirc;i bất cứ l&uacute;c n&agrave;o qua số 0903706285 hoặc địa chỉ email myphameucerin@gmail.com hoăc đến trực tiếp tại K8 Bis Bửu Long, phường 15, quận 10 Tp.Hồ Ch&iacute; Minh. Ch&uacute;ng t&ocirc;i sẽ giải quyết vấn đề của bạn sớm nhất ngay khi c&oacute; thể.<br></span><span style="font-size: 11pt;">Trong trường hợp bạn muốn khiếu nại về sản phẩm, Ch&uacute;ng t&ocirc;i mong bạn c&oacute; thể hợp t&aacute;c bằng c&aacute;ch cung cấp th&ocirc;ng tin c&agrave;ng chi tiết c&agrave;ng tốt về t&igrave;nh trạng sản phẩm v&agrave; c&aacute;c th&ocirc;ng tin li&ecirc;n quan đến việc mua h&agrave;ng như m&atilde; đơn h&agrave;ng, X&aacute;c nhận đơn h&agrave;ng, h&oacute;a đơn mua h&agrave;ng. Lưu &yacute; nếu trong v&ograve;ng 5 ng&agrave;y l&agrave;m việc m&agrave; bạn vẫn chưa nhận được phản hồi từ ch&uacute;ng t&ocirc;i, xin vui l&ograve;ng li&ecirc;n lạc lại v&igrave; trong một số trường hợp hiếm hoi, email của bạn gửi đến hoặc email của ch&uacute;ng t&ocirc;i gửi đến Bạn đ&atilde; bị thất lạc.</span></p>`;
export default function ProductDetailPage() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  const safeHTML = DOMPurify.sanitize(longHTML);
  const safeHTML2 = DOMPurify.sanitize(instruction);

  return (
    <div className="flex flex-col p-[40px] font-open">
      {/* main */}
      <div className="flex justify-between">
        <div className="w-[45%]">
          <Image
            alt=""
            src="/product.webp"
            width={533}
            height={533}
            className="object-cover rounded-[20px]"
          />
        </div>
        <div className="w-[50%] flex flex-col">
          <p className="text-normal font-light mb-[10px]">La Roche Posay</p>
          <p className="font-bold text-[22px] text-foreground mb-[20px]">
            Dưỡng chất dưỡng da giúp mờ thâm nám dưỡng sáng da La Roche Posay
            Mela B3 Serum 30ml
          </p>
          <div className="flex justify-between items-center mb-[30px]">
            <p className="text-[26px] font-semibold text-primary">
              {formatPrice(1300000)}
            </p>
            <p className="text-normal">Đơn vị: Thùng</p>
          </div>
          <Button size="lg" className="w-full" variant="flat" color="secondary">
            <p className="font-bold font-open">Thêm vào giỏ hàng</p>
          </Button>
        </div>
      </div>

      {/* description */}
      <div className="flex flex-col mt-[40px]">
        <p className="text-[24px] font-light">Chi tiết sản phẩm</p>
        <Accordion variant="light">
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="Mô tả sản phẩm"
          >
            <div
              className="text-medium/loose"
              dangerouslySetInnerHTML={{ __html: safeHTML }}
            />{" "}
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            title="Chính sách thanh toán"
          >
            <div dangerouslySetInnerHTML={{ __html: safeHTML2 }}></div>
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
            {defaultContent}
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
