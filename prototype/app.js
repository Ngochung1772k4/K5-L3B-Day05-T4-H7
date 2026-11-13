/* Prototype lớp học: tất cả phân loại dưới đây là luật mô phỏng, không gọi AI hay hệ thống thật. */
const samples = [
  {
    id: 'capacity', label: 'Nồi 6L / lòng nồi 5L', type: 'Dung tích chưa rõ',
    code: 'ECOM-4821 · SPX-740218',
    buyer: 'Nồi ghi 6 lít mà lòng nồi đo chỉ được 5 lít. Mình muốn trả hàng hoàn tiền.',
    seller: '6L là dung tích tổng. Shop vừa cập nhật mô tả để ghi rõ lòng nồi khoảng 5L.',
    status: 'Chưa đủ căn cứ để kết luận',
    detail: 'Hai con số có thể nói về hai phần khác nhau; mô tả lúc mua chưa làm rõ.',
    snapshot: { text: '“Dung tích 6L”', time: '12/11/2026 · 18:16 · snapshot đơn mẫu' },
    currentListing: { text: '“6L tổng · lòng nồi khoảng 5L”', time: 'Sửa 13/11/2026 · 08:50' },
    known: [
      'Snapshot đơn mẫu lúc đặt chỉ ghi “Dung tích 6L”, chưa nêu rõ loại dung tích.',
      'Người mua nói đo lòng nồi 5L; shop nói 6L là dung tích tổng.',
      'Trang sản phẩm mẫu được sửa sau khi đặt để phân biệt 6L tổng và lòng nồi 5L.'
    ],
    missing: ['Ảnh nhãn và ảnh lòng nồi có thể đối chiếu.', 'Giải thích/bằng chứng về loại dung tích được quảng cáo lúc mua.'],
    reason: 'Lời của người mua và shop đều được ghi nhận, nhưng không lời nào tự chứng minh loại dung tích đã được hứa tại thời điểm mua.',
    buyerReply: 'Mình thấy bản mô tả lúc bạn đặt chỉ ghi “dung tích 6L”, còn shop giải thích đó là dung tích tổng. Mình chưa thể kết luận hàng sai. Bạn có thể bổ sung ảnh lòng nồi/nhãn hoặc yêu cầu nhân viên xem hồ sơ.',
    sellerReply: 'Người mua phản ánh lòng nồi đo được 5L trong khi mô tả lúc đặt chỉ ghi “dung tích 6L”. Vui lòng bổ sung ảnh nhãn và căn cứ giải thích loại dung tích. Hồ sơ chưa có quyết định hoàn tiền hay từ chối.',
    auto: 'Đối chiếu snapshot lúc đặt với mô tả hiện tại; ghi rõ mâu thuẫn và chuyển người khi chứng cứ vẫn bất đồng.',
    review: 'Nhân viên kiểm tra nội dung yêu cầu ảnh trước khi gửi; hoàn hoặc từ chối cần người có thẩm quyền duyệt.',
    ban: 'Tự hoàn tiền, tự từ chối hoặc phạt shop khi loại dung tích chưa rõ.',
    draftLabel: 'Soạn yêu cầu ảnh nhãn · chờ duyệt',
    draftEvent: 'Đã soạn yêu cầu ảnh nhãn cho shop; chưa gửi vì cần nhân viên duyệt.',
    escalateLabel: 'Chuyển nhân viên xem xét',
    escalateEvent: 'Đã mô phỏng chuyển hồ sơ kèm snapshot và ý kiến hai bên.'
  },
  {
    id: 'edited', label: 'Shop sửa mô tả sau mua', type: 'Mô tả đã thay đổi',
    code: 'ECOM-4821 · SPX-740218',
    buyer: 'Shop sửa mô tả thành “6L tổng, lòng nồi 5L” sau khi tôi đặt. Giờ shop bảo tôi đọc nhầm.',
    seller: 'Shop đã cập nhật trang sản phẩm để ghi rõ dung tích tổng và dung tích lòng nồi.',
    status: 'Cần xác minh lịch sử mô tả',
    detail: 'Trang hiện tại khác bản lưu lúc mua; không được dùng bản mới để xử thua người mua.',
    snapshot: { text: '“Dung tích 6L”', time: '12/11/2026 · 18:16 · snapshot đơn mẫu' },
    currentListing: { text: '“6L tổng · lòng nồi khoảng 5L”', time: 'Sửa 13/11/2026 · 08:50' },
    known: ['Snapshot mẫu lúc đặt chỉ ghi “Dung tích 6L”.', 'Trang mẫu hiện tại ghi “6L tổng · lòng nồi 5L” và được sửa sau khi mua.', 'Hai bên đã nêu cách hiểu khác nhau.'],
    missing: ['Ảnh sản phẩm/nhãn nhận được.', 'Người xử lý xác nhận lịch sử phiên bản và căn cứ hai bên.'],
    reason: 'Nguồn sự thật của giao dịch là nội dung tại thời điểm đặt. Bản sửa về sau giải thích cách shop trình bày hiện nay, nhưng không thay thế lời hứa trước đó.',
    buyerReply: 'Mình thấy mô tả hiện tại khác bản lưu lúc bạn đặt. Hồ sơ sẽ dùng bản lưu lúc đặt để xem xét và chuyển người kiểm tra lịch sử. Khiếu nại hiện chưa được quyết định; bạn có thể bổ sung ảnh sản phẩm/nhãn.',
    sellerReply: 'Hồ sơ ghi nhận trang sản phẩm đã cập nhật sau thời điểm đặt. Người xử lý sẽ xem bản lưu lúc đặt cùng phản hồi của shop. Bạn có thể bổ sung giải thích và chứng cứ liên quan trong hồ sơ.',
    auto: 'Gắn cờ hai phiên bản khác nhau và chuyển trưởng nhóm khi chứng cứ mâu thuẫn.',
    review: 'Yêu cầu chứng cứ mới và mọi đề xuất hoàn/từ chối phải được người có quyền xem xét.',
    ban: 'Lấy mô tả hiện tại thay cho snapshot lúc mua; tự từ chối hoặc hoàn tiền.',
    draftLabel: 'Soạn yêu cầu ảnh sản phẩm · chờ duyệt',
    draftEvent: 'Đã soạn yêu cầu ảnh sản phẩm; chưa gửi vì cần nhân viên duyệt.',
    escalateLabel: 'Chuyển người kiểm tra lịch sử',
    escalateEvent: 'Đã mô phỏng chuyển hai phiên bản mô tả cho người xử lý.'
  },
  {
    id: 'size', label: 'Đặt size L, nhận size M', type: 'Bằng chứng tương đối rõ',
    code: 'ECOM-4822 · ĐƠN MẪU',
    buyer: 'Tôi đặt áo size L nhưng nhận size M. Shop đã xác nhận gửi nhầm, hoàn tiền giúp tôi.',
    seller: 'Shop xác nhận đã gửi nhầm size M thay vì size L của đơn mẫu.',
    status: 'Có thể soạn đề xuất · vẫn cần duyệt',
    detail: 'Căn cứ mẫu khớp nhau, nhưng quyết định tài chính vẫn thuộc người có thẩm quyền.',
    known: ['Đơn mẫu ghi phân loại size L.', 'Ảnh nhãn mẫu thể hiện size M.', 'Trong fixture, shop xác nhận gửi nhầm.'],
    missing: ['Nhân viên kiểm tra điều kiện trả hàng/hoàn tiền của hồ sơ.', 'Người có thẩm quyền duyệt quyết định tài chính.'],
    reason: 'Ba nguồn mẫu cùng chỉ ra khác biệt size, nên AI có thể chuẩn bị đề xuất. Một đề xuất vẫn có thể sai đơn hoặc sai điều kiện chính sách.',
    buyerReply: 'Mình đã ghi nhận đơn mẫu đặt size L, ảnh nhãn size M và phản hồi xác nhận của shop. Mình có thể chuẩn bị đề xuất để nhân viên xem xét. Chưa có quyết định hoàn tiền hoặc chuyển tiền.',
    sellerReply: 'Hồ sơ mẫu ghi nhận xác nhận gửi nhầm size của shop. Nhân viên sẽ xem phân loại đơn, ảnh nhãn và điều kiện xử lý trước khi quyết định. Shop có thể bổ sung thông tin nếu cần.',
    auto: 'Tổng hợp ba nguồn và chuẩn bị phần căn cứ cho người duyệt.',
    review: 'AI chỉ soạn bản nháp hoàn tiền; nhân viên có thẩm quyền kiểm tra và quyết định.',
    ban: 'Tự chuyển tiền hoặc tự đóng khiếu nại dù shop đã xác nhận gửi nhầm.',
    draftLabel: 'Soạn đề xuất hoàn · chờ duyệt',
    draftEvent: 'Đã soạn đề xuất hoàn cho nhân viên; chưa hoàn tiền.',
    escalateLabel: 'Chuyển nhân viên duyệt',
    escalateEvent: 'Đã mô phỏng chuyển hồ sơ size L/M cho người có thẩm quyền.'
  },
  {
    id: 'vague', label: '“Hàng sai rồi, xử lý đi”', type: 'Thiếu thông tin',
    code: 'CHƯA XÁC ĐỊNH ĐƠN',
    buyer: 'Hàng sai rồi, xử lý đi. Tôi muốn hoàn tiền ngay.',
    seller: '',
    status: 'Cần hỏi rõ trước khi hành động',
    detail: 'Chưa có mã đơn, món hàng hoặc điểm không khớp.',
    known: ['Đã ghi nhận người mua nói hàng nhận không đúng.'],
    missing: ['Đơn hàng liên quan.', 'Chi tiết nào khác với mô tả lúc đặt.', 'Bằng chứng phù hợp với điểm khác biệt.'],
    reason: 'Gửi yêu cầu cho shop hoặc soạn hoàn khi chưa chọn đúng đơn có thể ảnh hưởng nhầm người bán.',
    buyerReply: 'Mình muốn kiểm tra đúng đơn trước khi xử lý. Bạn cho biết đơn nào và sản phẩm khác mô tả ở điểm nào? Hiện mình chưa gửi yêu cầu cho shop hay đưa ra quyết định hoàn tiền.',
    sellerReply: 'Chưa có thông báo gửi shop vì người mua chưa xác định được đơn và điểm không khớp.',
    auto: 'Hỏi một câu làm rõ đơn hàng và điểm sai; giữ hồ sơ ở trạng thái chưa quyết định.',
    review: 'Chỉ soạn yêu cầu chứng cứ sau khi đã xác định đúng đơn; nhân viên duyệt trước khi gửi.',
    ban: 'Đoán đơn hàng, gửi yêu cầu nhầm shop hoặc tự hoàn tiền.',
    draftLabel: null,
    escalateLabel: 'Nhờ nhân viên hỗ trợ chọn đơn',
    escalateEvent: 'Đã mô phỏng chuyển yêu cầu thiếu thông tin cho nhân viên hỗ trợ.'
  },
  {
    id: 'fake', label: 'Nghi hàng giả, đòi khóa shop', type: 'Ngoài luồng khiếu nại thường',
    code: 'ECOM-4823 · ĐƠN MẪU',
    buyer: 'Hàng giả đó, khóa shop ngay. Đây là ảnh hộp tôi nhận được.',
    seller: 'Shop chưa đồng ý với nhận định hàng giả và muốn được cung cấp chứng cứ liên quan.',
    status: 'Cần bộ phận chuyên trách xác minh',
    detail: 'Một ảnh hoặc một lời tố cáo chưa đủ để kết luận hàng giả hay xử phạt.',
    known: ['Người mua nêu nghi vấn hàng giả và nói có ảnh hộp.', 'Shop chưa đồng ý; ảnh chưa được hệ thống mẫu xác minh.'],
    missing: ['Ảnh và thông tin nguồn gốc cần được chuyên trách kiểm tra.', 'Phản hồi và chứng cứ của shop.'],
    reason: 'Khóa hoặc phạt shop ảnh hưởng cả cửa hàng và vượt quyền trợ lý trong khiếu nại “không đúng mô tả”.',
    buyerReply: 'Mình đã ghi nhận nghi vấn của bạn. Ảnh hộp chưa đủ để kết luận sản phẩm là hàng giả hoặc khóa shop. Hồ sơ cần được chuyển bộ phận chuyên trách xác minh; bạn có thể bổ sung chứng cứ trong kênh của sàn.',
    sellerReply: 'Có phản ánh về nguồn gốc sản phẩm trong hồ sơ mẫu. Bộ phận chuyên trách sẽ xem chứng cứ hai bên. Hiện chưa có kết luận hàng giả hoặc quyết định xử phạt shop.',
    auto: 'Gắn cờ nghi vấn và chuyển hồ sơ cho bộ phận chuyên trách.',
    review: 'Bộ phận chuyên trách xác minh chứng cứ và quyết định theo quy trình riêng.',
    ban: 'AI tự kết luận hàng giả, phạt hoặc khóa shop từ một ảnh.',
    draftLabel: null,
    escalateLabel: 'Chuyển bộ phận chuyên trách',
    escalateEvent: 'Đã mô phỏng chuyển nghi vấn hàng giả cho bộ phận chuyên trách.'
  },
  {
    id: 'privacy', label: 'Xin số điện thoại shop', type: 'Yêu cầu thông tin riêng',
    code: 'KHÔNG CẦN CHUYỂN DỮ LIỆU',
    buyer: 'Cho tôi số điện thoại của shop để tôi tự gọi nói chuyện.',
    seller: '',
    status: 'Yêu cầu vượt phạm vi cho phép',
    detail: 'Thông tin liên hệ riêng của hai bên không được chia sẻ trong luồng này.',
    known: ['Người mua muốn liên hệ trực tiếp với shop.'],
    missing: ['Nếu có tranh chấp, hai bên cần trao đổi chứng cứ qua hồ sơ của sàn.'],
    reason: 'Không có tool được phép cung cấp số điện thoại hoặc địa chỉ riêng; từ chối tiết lộ không đồng nghĩa từ chối khiếu nại.',
    buyerReply: 'Mình không thể cung cấp số điện thoại hoặc địa chỉ riêng của shop. Bạn có thể trao đổi và gửi chứng cứ trong kênh của sàn; nếu cần, mình sẽ giúp chuyển hồ sơ cho nhân viên.',
    sellerReply: 'Chưa có thông báo hoặc thông tin liên hệ nào được gửi cho shop từ yêu cầu này.',
    auto: 'Từ chối chia sẻ thông tin riêng và hướng dẫn dùng kênh trao đổi của sàn.',
    review: 'Nếu cần xử lý tranh chấp, nhân viên xem nội dung và chứng cứ trong hồ sơ.',
    ban: 'Tiết lộ số điện thoại, địa chỉ hoặc dữ liệu cá nhân của một bên cho bên kia.',
    draftLabel: null,
    escalateLabel: 'Chuyển nhân viên hỗ trợ',
    escalateEvent: 'Đã mô phỏng chuyển yêu cầu hỗ trợ; không chia sẻ thông tin riêng.'
  },
  {
    id: 'repeat', label: '“Tôi gửi ảnh rồi”', type: 'Tránh hỏi lặp bằng chứng',
    code: 'ECOM-4824 · ĐƠN MẪU',
    buyer: 'Tôi gửi ảnh nhãn rồi mà hệ thống cứ hỏi lại. Các bạn có đọc hồ sơ không?',
    seller: 'Shop đang chờ câu hỏi cụ thể về phần còn thiếu.',
    status: 'Cần kiểm tra chứng cứ đã nhận',
    detail: 'Không yêu cầu người mua gửi lại ảnh đã có trong hồ sơ mẫu.',
    known: ['Hồ sơ mẫu đã nhận ảnh nhãn sản phẩm.', 'Người mua phản ánh bị hỏi lặp.'],
    missing: ['Nếu còn cần, phải chỉ rõ ảnh góc/chi tiết nào chưa có.', 'Nhân viên kiểm tra ảnh đã nhận trước khi gửi yêu cầu mới.'],
    reason: 'Hỏi lại chung chung làm người mua tốn công và mất niềm tin; AI phải kiểm kê chứng cứ trước.',
    buyerReply: 'Mình thấy hồ sơ mẫu đã có ảnh nhãn. Xin lỗi vì yêu cầu lặp lại. Mình sẽ không hỏi lại ảnh đó; nếu còn thiếu góc chụp nào, yêu cầu mới sẽ nói rõ. Bạn cũng có thể nhờ nhân viên xem ngay.',
    sellerReply: 'Hồ sơ mẫu đã có ảnh nhãn. Nếu cần thêm chứng cứ từ shop, yêu cầu sẽ nêu rõ chi tiết còn thiếu sau khi được nhân viên duyệt; hiện chưa có quyết định.',
    auto: 'Kiểm kê ảnh đã có và nêu chính xác phần còn thiếu.',
    review: 'Nhân viên xác nhận nội dung yêu cầu bổ sung trước khi gửi cho bên liên quan.',
    ban: 'Tự gửi lại yêu cầu chung chung về ảnh đã nhận; tự kết luận khi chưa xem ảnh.',
    draftLabel: 'Soạn yêu cầu chi tiết · chờ duyệt',
    draftEvent: 'Đã soạn yêu cầu nêu rõ ảnh còn thiếu; chưa gửi vì cần nhân viên duyệt.',
    escalateLabel: 'Chuyển nhân viên xem ảnh',
    escalateEvent: 'Đã mô phỏng chuyển hồ sơ cùng danh sách ảnh đã nhận.'
  }
];

const byId = (id) => document.getElementById(id);
const state = { selectedId: null, outcome: null, drafted: false, escalated: false, rating: null, events: [] };
let toastTimer;

function normalize(value) {
  return value.toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
}

function classify(text) {
  const value = normalize(text);
  const suspectsFake = /hang gia|gia mao|khoa shop|phat shop/.test(value);
  const asksPrivate = /so dien thoai|dia chi|lien he rieng/.test(value);
  if (suspectsFake && asksPrivate) return 'privacyFake';
  if (asksPrivate) return 'privacy';
  if (suspectsFake) return 'fake';
  if (/(sua|doi|chinh|cap nhat).{0,24}mo ta|mo ta.{0,24}(sua|doi|chinh|cap nhat)/.test(value)) return 'edited';
  if (/(da )?gui.{0,30}(anh|bang chung).{0,18}roi|anh.{0,25}(da gui|gui roi|nop roi)/.test(value)) return 'repeat';
  if (/size|kich co|co ao/.test(value)) return 'size';
  if (/dung tich|long noi|6\s*(l|lit)|5\s*(l|lit)/.test(value)) return 'capacity';
  return 'vague';
}

function customAssessment(kind, hasSeller) {
  const common = {
    code: 'TIN TỰ NHẬP · CHƯA CÓ ĐƠN',
    known: ['Đã ghi nhận lời người mua dưới dạng thông tin tự khai.', ...(hasSeller ? ['Đã ghi nhận lời shop dưới dạng thông tin tự khai.'] : [])],
    missing: ['Mã đơn và snapshot mô tả tại thời điểm đặt.', 'Chứng cứ liên quan cần được kiểm tra trong hồ sơ.'],
    status: 'Chưa đủ căn cứ để kết luận',
    detail: 'Văn bản tự nhập chưa liên kết đơn hàng hoặc nguồn đã xác minh.',
    auto: 'Phân loại sơ bộ và hỏi đúng thông tin còn thiếu; chưa làm thay đổi hồ sơ thật.',
    review: 'Yêu cầu chứng cứ mới, hoàn tiền hoặc từ chối cần người có thẩm quyền kiểm tra.',
    ban: 'Tự kết luận đúng/sai, tự chuyển tiền, từ chối hoặc phạt shop.',
    draftLabel: null,
    escalateLabel: 'Mô phỏng chuyển nhân viên',
    escalateEvent: 'Đã mô phỏng chuyển lời trình bày chưa xác minh cho nhân viên.'
  };
  const variants = {
    capacity: {
      type: 'Nghi vấn về dung tích',
      reason: 'Hai số đo có thể chỉ hai phần khác nhau. Cần xem bản mô tả lúc mua và ảnh nhãn trước khi kết luận.',
      buyerReply: 'Mình đã ghi nhận nghi vấn về dung tích. Vì chưa có đơn và bản mô tả lúc mua, mình chưa thể xác định sản phẩm sai mô tả. Bạn có thể cung cấp mã đơn và ảnh nhãn/lòng nồi hoặc nhờ nhân viên xem xét.',
      sellerReply: 'Có phản ánh về dung tích, nhưng lời nhắn thử chưa liên kết hồ sơ thật. Khi xác định đúng đơn, shop sẽ được mời nêu loại dung tích và chứng cứ liên quan; chưa có quyết định.'
    },
    edited: {
      type: 'Nghi mô tả đã thay đổi',
      reason: 'Lời báo rằng trang đã sửa cần được so với snapshot lúc đặt; trang hiện tại không thay thế được lịch sử đơn.',
      buyerReply: 'Mình đã ghi nhận việc bạn nói mô tả bị sửa sau khi mua. Cần đối chiếu bản lưu lúc đặt với bản hiện tại trước khi quyết định. Bạn hãy cung cấp mã đơn; nếu lịch sử thiếu, hồ sơ nên chuyển nhân viên.',
      sellerReply: 'Có phản ánh rằng mô tả đã thay đổi sau lúc đặt. Khi xác định đúng đơn, shop có thể bổ sung giải thích và chứng cứ; hiện chưa có kết luận về trách nhiệm của bên nào.'
    },
    size: {
      type: 'Nghi giao sai phân loại',
      reason: 'Cần so phân loại đã đặt với ảnh nhãn và phản hồi shop, không dựa riêng vào lời kể.',
      buyerReply: 'Mình đã ghi nhận bạn báo sản phẩm nhận được khác size đã đặt. Cần kiểm tra đúng mã đơn, phân loại đơn, ảnh nhãn và phản hồi shop. Khi các nguồn khớp, AI có thể soạn đề xuất cho nhân viên duyệt, chưa tự hoàn tiền.',
      sellerReply: 'Có phản ánh về sai phân loại sản phẩm. Shop sẽ có cơ hội đối chiếu đơn và cung cấp phản hồi qua hồ sơ; hiện chưa có quyết định hoàn tiền hay từ chối.'
    },
    fake: {
      type: 'Nghi hàng giả',
      reason: 'Nghi vấn cần bộ phận chuyên trách xác minh; lời tố cáo không phải căn cứ để AI phạt shop.',
      buyerReply: 'Mình đã ghi nhận nghi vấn hàng giả. Mình chưa thể kết luận hoặc khóa shop từ lời nhắn này. Hãy chọn đúng đơn và gửi chứng cứ qua hồ sơ để bộ phận chuyên trách xem xét.',
      sellerReply: 'Có nghi vấn về nguồn gốc sản phẩm trong lời nhắn thử. Nếu có hồ sơ cụ thể, shop sẽ được quyền cung cấp chứng cứ; chưa có kết luận hoặc chế tài.'
    },
    privacy: {
      type: 'Yêu cầu dữ liệu riêng',
      reason: 'Không có quyền chia sẻ liên hệ riêng; tranh chấp cần được trao đổi trong kênh của sàn.',
      buyerReply: 'Mình không thể cung cấp số điện thoại hoặc địa chỉ riêng của bên kia. Bạn có thể trao đổi về đơn và gửi chứng cứ trong kênh của sàn.',
      sellerReply: 'Không có thông tin liên hệ riêng nào được gửi cho shop hoặc người mua từ lời nhắn này.',
      missing: ['Không cần thêm chứng cứ để từ chối cung cấp liên hệ riêng. Nếu có tranh chấp, hai bên trao đổi qua hồ sơ của sàn.'],
      ban: 'Tiết lộ số điện thoại, địa chỉ hoặc dữ liệu riêng của bất kỳ bên nào.'
    },
    privacyFake: {
      type: 'Nghi hàng giả + xin liên hệ riêng',
      reason: 'Hai yêu cầu cần xử lý riêng: từ chối tiết lộ liên hệ ngay, còn nghi vấn hàng giả cần bộ phận chuyên trách xác minh.',
      buyerReply: 'Mình không thể cung cấp số điện thoại riêng hoặc tự khóa shop. Mình đã ghi nhận nghi vấn hàng giả; bạn hãy chọn đúng đơn và nộp chứng cứ qua hồ sơ để bộ phận chuyên trách xem xét. Hiện chưa có kết luận hoặc chế tài.',
      sellerReply: 'Có nghi vấn về nguồn gốc sản phẩm trong lời nhắn thử. Khi có hồ sơ cụ thể, shop có thể cung cấp chứng cứ cho bộ phận chuyên trách. Không có thông tin liên hệ riêng nào được chia sẻ.',
      auto: 'Từ chối chia sẻ liên hệ riêng, ghi nhận nghi vấn và hướng dẫn chuyển bộ phận chuyên trách.',
      review: 'Bộ phận chuyên trách xác minh chứng cứ và xử lý theo quy trình riêng.',
      ban: 'Tiết lộ số điện thoại/địa chỉ, tự kết luận hàng giả hoặc tự phạt/khóa shop.',
      escalateLabel: 'Mô phỏng chuyển chuyên trách',
      escalateEvent: 'Đã mô phỏng chuyển nghi vấn cho chuyên trách; không chia sẻ liên hệ riêng.'
    },
    repeat: {
      type: 'Nghi yêu cầu bằng chứng lặp',
      reason: 'Không nên yêu cầu gửi lại ảnh trước khi kiểm tra danh sách chứng cứ đã nhận.',
      buyerReply: 'Mình đã ghi nhận rằng bạn nói đã gửi ảnh. Mình cần kiểm tra hồ sơ để xác nhận ảnh nào đã nhận, rồi mới nêu chính xác phần còn thiếu. Bạn có thể chuyển nhân viên xem ngay, không phải gửi lại ảnh một cách mù mờ.',
      sellerReply: 'Có phản ánh về yêu cầu bằng chứng bị lặp. Yêu cầu mới chỉ được gửi sau khi kiểm tra ảnh đã có và nêu rõ phần còn thiếu.'
    },
    vague: {
      type: 'Tin nhắn chưa rõ',
      reason: 'Chưa biết đúng đơn và điểm khác mô tả; đoán sẽ gây gửi nhầm hoặc xử nhầm shop.',
      buyerReply: 'Mình muốn giúp bạn kiểm tra đúng đơn. Bạn cho biết mã đơn và sản phẩm khác mô tả lúc đặt ở điểm nào? Hiện chưa có yêu cầu gửi shop hoặc quyết định hoàn tiền.',
      sellerReply: 'Chưa có thông báo gửi shop vì lời nhắn chưa xác định đơn hoặc điểm không khớp.'
    }
  };
  const variant = variants[kind];
  return { ...common, ...variant, fixture: false };
}

function setList(id, items) {
  const list = byId(id);
  list.replaceChildren();
  items.forEach((item) => {
    const node = document.createElement('li');
    node.textContent = item;
    list.appendChild(node);
  });
}

function addEvent(title, detail) {
  state.events.push({ title, detail });
  const list = byId('timeline');
  list.replaceChildren();
  state.events.forEach((event) => {
    const row = document.createElement('li');
    const heading = document.createElement('b');
    const text = document.createElement('span');
    heading.textContent = event.title;
    text.textContent = event.detail;
    row.append(heading, text);
    list.appendChild(row);
  });
}

function showToast(message) {
  const toast = byId('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

function renderSamples() {
  const list = byId('sampleList');
  list.replaceChildren();
  samples.forEach((sample) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'sample-button';
    button.textContent = sample.label;
    button.setAttribute('aria-pressed', String(state.selectedId === sample.id));
    button.addEventListener('click', () => selectSample(sample.id));
    list.appendChild(button);
  });
}

function renderOutcome() {
  const data = state.outcome;
  if (!data) return;
  const privacyOnly = data.id === 'privacy' || data.type === 'Yêu cầu dữ liệu riêng';
  byId('caseCode').textContent = data.code;
  byId('caseType').textContent = data.type;
  byId('statusTitle').textContent = state.escalated ? 'Đã chuyển người xem xét · chưa có quyết định' : state.drafted ? 'Đã lập bản nháp · chờ nhân viên duyệt' : data.status;
  byId('statusDetail').textContent = state.escalated ? 'Hồ sơ mô phỏng đi kèm lời trình bày và căn cứ đang có.' : state.drafted ? 'Bản nháp chưa gửi shop, chưa hoàn tiền và chưa đóng khiếu nại.' : data.detail;
  document.querySelector('.decision-state').classList.toggle('escalated', state.escalated);
  byId('versionCompare').hidden = !data.snapshot;
  if (data.snapshot) {
    byId('snapshotText').textContent = data.snapshot.text;
    byId('snapshotTime').textContent = data.snapshot.time;
    byId('currentText').textContent = data.currentListing.text;
    byId('currentTime').textContent = data.currentListing.time;
  }
  setList('knownList', data.known);
  setList('missingList', data.missing);
  byId('reasonText').textContent = data.reason;
  byId('buyerReply').textContent = data.buyerReply + (state.escalated ? '\n\nCập nhật mô phỏng: Hồ sơ đã chuyển người xem xét; chưa có quyết định.' : state.drafted ? '\n\nCập nhật mô phỏng: Bản nháp đang chờ duyệt; chưa gửi hoặc chi tiền.' : '');
  byId('sellerReply').textContent = data.sellerReply + (state.escalated && !privacyOnly ? '\n\nCập nhật mô phỏng: Hồ sơ đã được chuyển người xử lý.' : '');
  byId('buyerStatus').textContent = state.escalated ? 'Chờ người xem xét' : state.drafted ? 'Bản nháp chờ duyệt' : 'Đang đối chiếu';
  byId('sellerStatus').textContent = privacyOnly ? 'Không gửi liên hệ riêng' : state.escalated ? 'Có thể phản hồi trong hồ sơ' : 'Chưa gửi thông báo';
  byId('autoPolicy').textContent = data.auto;
  byId('reviewPolicy').textContent = data.review;
  byId('banPolicy').textContent = data.ban;
  const draftButton = byId('draftBtn');
  draftButton.textContent = data.draftLabel || 'Cần xác định đơn/chứng cứ trước';
  draftButton.disabled = !data.draftLabel || state.drafted || state.escalated;
  const escalateButton = byId('escalateBtn');
  escalateButton.textContent = state.escalated ? 'Đã chuyển người xem xét ✓' : data.escalateLabel;
  escalateButton.disabled = state.escalated;
  byId('actionFootnote').textContent = data.fixture ? 'Mọi thao tác ở đây chỉ cập nhật bản mô phỏng trong trình duyệt; bản nháp cần duyệt trước khi gửi.' : 'Văn bản tự nhập chỉ được phân loại bằng luật mẫu. Chưa có đơn hay chứng cứ xác minh nên AI không soạn yêu cầu hoặc đề xuất tiền.';
}

function clearFeedback() {
  state.rating = null;
  byId('feedbackNote').value = '';
  byId('feedbackResult').hidden = true;
  document.querySelectorAll('[data-feedback]').forEach((button) => button.setAttribute('aria-pressed', 'false'));
}

function analyze() {
  const buyer = byId('buyerInput').value.trim();
  const seller = byId('sellerInput').value.trim();
  if (!buyer) {
    byId('formError').textContent = 'Hãy nhập lời người mua trước khi xem cách xử lý.';
    byId('formError').hidden = false;
    byId('buyerInput').focus();
    return;
  }
  byId('formError').hidden = true;
  const fixture = samples.find((sample) => sample.id === state.selectedId && buyer === sample.buyer && seller === sample.seller);
  if (!fixture) state.selectedId = null;
  state.outcome = fixture ? { ...fixture, fixture: true } : customAssessment(classify(buyer), Boolean(seller));
  state.drafted = false;
  state.escalated = false;
  state.events = [];
  clearFeedback();
  renderSamples();
  byId('sourceLabel').textContent = fixture ? `Ca mẫu ${fixture.code} · dữ liệu dựng` : 'Tự nhập · chưa liên kết hồ sơ xác minh';
  renderOutcome();
  addEvent('Đã phân tích lời nhắn trong bản mô phỏng', fixture ? `Đã nạp dữ liệu dựng: ${fixture.type}.` : `Nhận diện sơ bộ: ${state.outcome.type}; chưa xác minh dữ liệu.`);
  addEvent('Giữ quyền quyết định của con người', 'Không hoàn tiền, từ chối hoặc xử phạt tự động.');
}

function markStale() {
  state.selectedId = null;
  state.outcome = null;
  byId('formError').hidden = true;
  renderSamples();
  byId('sourceLabel').textContent = 'Nội dung đã sửa · bấm “Xem AI sẽ xử lý”';
  byId('statusTitle').textContent = 'Nội dung đã thay đổi';
  byId('statusDetail').textContent = 'Chạy lại tình huống để cập nhật toàn bộ bản xem trước.';
  byId('caseCode').textContent = 'CHỜ PHÂN TÍCH LẠI';
  byId('caseType').textContent = 'Chưa cập nhật';
  byId('versionCompare').hidden = true;
  byId('reasonText').textContent = 'Bản phân tích trước không còn áp dụng cho lời nhắn đã sửa.';
  setList('knownList', ['Chưa đối chiếu lời nhắn mới.']);
  setList('missingList', ['Chạy lại mô phỏng.']);
  byId('buyerReply').textContent = 'Bản xem trước đang chờ cập nhật theo lời nhắn mới.';
  byId('sellerReply').textContent = 'Bản xem trước đang chờ cập nhật theo lời nhắn mới.';
  byId('buyerStatus').textContent = 'Chờ phân tích lại';
  byId('sellerStatus').textContent = 'Chưa gửi';
  byId('autoPolicy').textContent = 'Chờ phân tích lại nội dung đã sửa.';
  byId('reviewPolicy').textContent = 'Yêu cầu mới và quyết định tiền vẫn cần người duyệt.';
  byId('banPolicy').textContent = 'Tự hoàn, từ chối, phạt shop hoặc tiết lộ dữ liệu riêng.';
  byId('draftBtn').disabled = true;
  byId('draftBtn').textContent = 'Chạy lại để xem bước phù hợp';
  byId('escalateBtn').disabled = true;
  byId('escalateBtn').textContent = 'Chạy lại để chuyển đúng hồ sơ';
  byId('actionFootnote').textContent = 'Bấm nút phân tích để bật các bước phù hợp với lời nhắn mới.';
  document.querySelector('.decision-state').classList.remove('escalated');
  clearFeedback();
}

function selectSample(id) {
  const sample = samples.find((item) => item.id === id);
  if (!sample) return;
  state.selectedId = sample.id;
  byId('buyerInput').value = sample.buyer;
  byId('sellerInput').value = sample.seller;
  analyze();
}

byId('scenarioForm').addEventListener('submit', (event) => {
  event.preventDefault();
  analyze();
  if (state.outcome) showToast('Đã cập nhật câu trả lời cho cả người mua và người bán.');
});
byId('buyerInput').addEventListener('input', markStale);
byId('sellerInput').addEventListener('input', markStale);

byId('draftBtn').addEventListener('click', () => {
  if (!state.outcome?.draftLabel || state.drafted || state.escalated) return;
  state.drafted = true;
  renderOutcome();
  addEvent('Bản nháp cần người duyệt', state.outcome.draftEvent);
  showToast('Đã tạo bản nháp mô phỏng. Chưa gửi hoặc quyết định tiền.');
});
byId('escalateBtn').addEventListener('click', () => {
  if (!state.outcome || state.escalated) return;
  state.escalated = true;
  renderOutcome();
  addEvent('Chuyển người xem xét', state.outcome.escalateEvent);
  showToast('Đã mô phỏng chuyển hồ sơ. Hai bên vẫn có quyền cung cấp căn cứ.');
});

document.querySelectorAll('[data-feedback]').forEach((button) => {
  button.addEventListener('click', () => {
    state.rating = button.dataset.feedback;
    document.querySelectorAll('[data-feedback]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  });
});
byId('saveFeedback').addEventListener('click', () => {
  if (!state.outcome) {
    showToast('Hãy chạy tình huống trước khi đánh giá câu trả lời.');
    return;
  }
  const note = byId('feedbackNote').value.trim();
  if (!state.rating && !note) {
    showToast('Chọn một đánh giá hoặc ghi bình luận trước khi lưu.');
    byId('feedbackNote').focus();
    return;
  }
  const label = state.rating || 'Bình luận';
  const result = byId('feedbackResult');
  const nextStep = state.rating === 'Có vẻ thiên vị'
    ? 'Đã gắn cờ để người xử lý rà lại căn cứ của cả hai bên; AI chưa thay đổi quyết định.'
    : state.rating === 'Thiếu căn cứ'
      ? 'Giữ hồ sơ ở trạng thái chưa kết luận và nêu rõ chứng cứ còn thiếu trước khi yêu cầu bổ sung.'
      : 'Ghi nhận ý kiến để người xử lý tham khảo; mọi quyết định vẫn cần căn cứ và đúng thẩm quyền.';
  result.textContent = `Đã ghi nhận trong phiên mô phỏng: ${label}${note ? ' — ' + note : ''}. ${nextStep}`;
  result.hidden = false;
  addEvent('Người xem đánh giá phản hồi AI', `${label}${note ? ': ' + note : ''}. Chưa thay đổi quyết định khiếu nại.`);
  showToast('Đã ghi nhận đánh giá trong phiên xem thử.');
});

byId('resetBtn').addEventListener('click', () => {
  selectSample('capacity');
  showToast('Đã đặt lại ca ECOM-4821.');
});

selectSample('capacity');
if (new URLSearchParams(location.search).get('state') === 'escalated') {
  byId('escalateBtn').click();
  byId('toast').classList.remove('show');
  clearTimeout(toastTimer);
}
