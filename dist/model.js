(() => {
  const layers = [
    'Thị trường & kích cầu',
    'Công suất & sản lượng',
    'Doanh thu',
    'Chi phí',
    'Lợi nhuận',
    'Hiệu quả tài sản & vốn'
  ];

  const nodes = [
    {id:'marketing',layer:0,x:220,name:'Chi phí tiếp thị',unit:'đồng/tháng',formula:'Ngân sách thương hiệu + quảng cáo + khuyến mại',meaning:'Nguồn lực dùng để tạo nhận biết, kích hoạt nhu cầu và thúc đẩy mua.',question:'Mỗi đồng tiếp thị tạo thêm bao nhiêu khách có lãi góp dương?',source:'Diễn giải quản trị; cần đo theo chiến dịch, tuyến và nhóm khách.'},
    {id:'channel_reach',layer:0,x:400,name:'Độ phủ kênh bán',unit:'điểm/kênh hoạt động',formula:'Số kênh hoạt động × năng suất bình quân/kênh',meaning:'Mức độ công suất được đưa đến đúng nơi khách có thể tìm và mua.',question:'Kênh nào mang khách tăng thêm, không chỉ chuyển khách từ kênh khác?',source:'Diễn giải quản trị từ P3 Phân phối.'},
    {id:'market_demand',layer:0,x:580,name:'Nhu cầu đủ điều kiện',unit:'hành khách tiềm năng',formula:'Khách tiềm năng × tỷ lệ có nhu cầu × tỷ lệ có khả năng mua',meaning:'Phần nhu cầu có khả năng chuyển thành hành khách trong kỳ.',question:'Nhu cầu tăng thật hay chỉ được dịch chuyển giữa chuyến và kênh?',source:'Biến đầu vào giả định; tệp KHKD chưa chứng minh đầy đủ quan hệ nhân quả.'},
    {id:'net_yield',layer:0,x:760,name:'Thực thu/khách',unit:'đồng/hành khách',formula:'Doanh thu vé thực thu ÷ số hành khách',meaning:'Giá trị thực nhận sau giảm giá, hoàn hủy và điều chỉnh.',question:'Giá thay đổi làm lượng khách và lãi góp cuối cùng đổi thế nào?',source:'Chỉ số suy ra từ logic giá và doanh thu của mô hình.'},
    {id:'cargo_trip',layer:0,x:940,name:'Doanh thu hàng hóa/lượt',unit:'đồng/lượt',formula:'Doanh thu hàng hóa ÷ tổng lượt xe',meaning:'Doanh thu bổ sung từ hàng hóa trên mỗi lượt vận hành.',question:'Phần hàng hóa có dùng công suất nhàn rỗi hay làm tăng chi phí phục vụ?',source:'Biến doanh thu trong tệp KHKD HVXT.'},

    {id:'fleet',layer:1,x:220,name:'Số xe hoạt động',unit:'xe',formula:'Xe sẵn sàng − xe ngừng hoạt động',meaning:'Số tài sản thực tế có thể khai thác trong kỳ.',question:'Xe tăng thêm có tạo nhu cầu và lợi nhuận đủ bù vốn hay không?',source:'Biến vận hành và tài sản trong tệp KHKD.'},
    {id:'trip_vehicle_day',layer:1,x:400,name:'Lượt/xe/ngày',unit:'lượt/xe/ngày',formula:'Tổng lượt ÷ số xe hoạt động ÷ số ngày',meaning:'Mức sử dụng đội xe theo thời gian.',question:'Xe đang mất thời gian ở chờ, chạy rỗng hay ngừng sửa chữa?',source:'Có thể suy ra từ lượt xe, số xe và ngày hoạt động.'},
    {id:'total_trips',layer:1,x:580,name:'Tổng lượt xe',unit:'lượt',formula:'Số xe × lượt/xe/ngày × số ngày',meaning:'Tổng số lượt vận hành được cung ứng trong kỳ.',question:'Lượt tăng thêm có nhu cầu tương ứng hay làm loãng hệ số lấp đầy?',source:'Cấu phần trực tiếp của mô hình doanh thu.'},
    {id:'capacity',layer:1,x:760,name:'Sức chứa bình quân',unit:'ghế/lượt',formula:'Tổng ghế cung ứng ÷ tổng lượt xe',meaning:'Công suất hành khách được cung ứng trên mỗi lượt.',question:'Cấu hình xe có khớp với nhu cầu từng tuyến và khung giờ?',source:'Biến sản phẩm và phương tiện trong KHKD.'},
    {id:'load_factor',layer:1,x:940,name:'Hệ số lấp đầy',unit:'%',formula:'Hành khách thực chở ÷ ghế cung ứng',meaning:'Tỷ lệ công suất ghế đã được sử dụng.',question:'Tăng lấp đầy nhờ khách tăng thật hay nhờ giảm giá quá sâu?',source:'Dữ liệu sản phẩm trong KHKD; công thức trình bày dạng đơn giản để học.'},
    {id:'pax_trip',layer:1,x:1100,name:'Hành khách/lượt',unit:'khách/lượt',formula:'Sức chứa bình quân × hệ số lấp đầy',meaning:'Sản lượng hành khách tạo ra trên mỗi lượt xe.',question:'Chuyến nào đang che giấu chuyến đầy và chuyến rỗng trong số bình quân?',source:'Công thức vận hành suy ra từ sức chứa và hệ số lấp đầy.'},

    {id:'passenger_revenue',layer:2,x:400,name:'Doanh thu hành khách',unit:'đồng',formula:'Tổng lượt × hành khách/lượt × thực thu/khách',meaning:'Doanh thu vé hành khách tạo ra trong kỳ.',question:'Đòn bẩy nào đang tạo tăng trưởng: lượt, khách/lượt hay thực thu?',source:'Công thức mô hình hóa từ các biến KHKD.'},
    {id:'cargo_revenue',layer:2,x:680,name:'Doanh thu hàng hóa',unit:'đồng',formula:'Tổng lượt × doanh thu hàng hóa/lượt',meaning:'Tổng doanh thu hàng hóa đi kèm hoạt động xe.',question:'Doanh thu hàng hóa tăng có tạo thêm biên lợi nhuận sau chi phí xử lý?',source:'Công thức mô hình hóa từ biến KHKD.'},
    {id:'total_revenue',layer:2,x:940,name:'Tổng doanh thu',unit:'đồng',formula:'Doanh thu hành khách + doanh thu hàng hóa',meaning:'Tổng giá trị bán hàng trước khi trừ chi phí.',question:'Doanh thu tăng có chuyển thành lãi góp và lợi nhuận trên vốn?',source:'Công thức tài chính cơ bản; số KHKD minh họa: doanh thu thuần khoảng 69,54 tỷ đồng.'},

    {id:'revenue_km',layer:3,x:200,name:'Km tạo doanh thu',unit:'km',formula:'Tổng lượt × km/chuyến có doanh thu',meaning:'Quãng đường gắn với chuyến tạo doanh thu.',question:'Bao nhiêu km là chạy rỗng và chưa được phản ánh ở đây?',source:'Biến vận hành cần đo theo tuyến và chuyến.'},
    {id:'fuel_km',layer:3,x:370,name:'Nhiên liệu/km',unit:'đồng/km',formula:'Tổng chi phí nhiên liệu ÷ tổng km',meaning:'Đơn giá nhiên liệu thực tế trên mỗi km vận hành.',question:'Chênh lệch đến từ giá nhiên liệu, xe, tuyến hay hành vi lái?',source:'Chỉ số chi phí vận hành; cần chuẩn hóa theo tuyến × xe × lái xe.'},
    {id:'maintenance_km',layer:3,x:540,name:'Bảo dưỡng/km',unit:'đồng/km',formula:'Chi phí bảo dưỡng, sửa chữa ÷ tổng km',meaning:'Chi phí giữ xe sẵn sàng và xử lý hao mòn theo quãng đường.',question:'Cắt chi phí hôm nay có làm tăng ngừng hoạt động và tổng chi phí sở hữu?',source:'Diễn giải quản trị từ P6, P7 và lớp Tài chính.'},
    {id:'labor_trip',layer:3,x:710,name:'Nhân sự/lượt',unit:'đồng/lượt',formula:'Chi phí nhân sự trực tiếp ÷ tổng lượt',meaning:'Chi phí lao động trực tiếp phân bổ cho mỗi lượt xe.',question:'Định biên có khớp lịch chạy và tiêu chuẩn an toàn?',source:'Chỉ số quản trị chi phí; không dùng để hợp thức hóa cắt giảm giờ nghỉ.'},
    {id:'channel_cost',layer:3,x:880,name:'Chi phí bán hàng',unit:'đồng',formula:'Hoa hồng + khuyến mại + chi phí kênh',meaning:'Chi phí để tiếp cận, chuyển đổi và phục vụ giao dịch.',question:'Khách tăng thêm có đủ lãi góp để hoàn vốn chi phí kênh?',source:'Diễn giải từ P3 Phân phối và P4 Xúc tiến.'},
    {id:'variable_cost',layer:3,x:1080,name:'Tổng biến phí',unit:'đồng',formula:'Km × (nhiên liệu/km + bảo dưỡng/km) + lượt × nhân sự/lượt + chi phí bán hàng',meaning:'Chi phí thay đổi theo mức khai thác, quãng đường và sản lượng.',question:'Biến phí nào tăng nhanh hơn doanh thu và vì sao?',source:'Công thức quản trị để học; cần đối soát với hệ thống tài khoản chính thức.'},

    {id:'contribution',layer:4,x:340,name:'Lãi góp',unit:'đồng',formula:'Tổng doanh thu − tổng biến phí',meaning:'Phần còn lại để trang trải định phí và tạo lợi nhuận.',question:'Lượt hoặc khách tăng thêm có làm lãi góp tăng thật?',source:'Công thức kế toán quản trị; không thay thế báo cáo tài chính.'},
    {id:'depreciation',layer:4,x:540,name:'Khấu hao',unit:'đồng',formula:'Nguyên giá phân bổ ÷ thời gian sử dụng hữu ích',meaning:'Chi phí phân bổ giá trị tài sản theo kỳ.',question:'Mua thêm xe làm năng suất tài sản tăng hay chỉ làm tăng định phí?',source:'Biến chi phí tài sản trong KHKD.'},
    {id:'admin_cost',layer:4,x:700,name:'Chi phí quản lý',unit:'đồng',formula:'Nhân sự gián tiếp + văn phòng + quản trị chung',meaning:'Chi phí vận hành bộ máy không trực tiếp gắn với từng lượt.',question:'Chi phí quản lý nào tạo năng lực, chi phí nào chỉ tạo thêm tầng nấc?',source:'Biến P&L trong KHKD.'},
    {id:'ebit',layer:4,x:860,name:'LN trước lãi vay & thuế',unit:'đồng',formula:'Lãi góp − khấu hao − chi phí quản lý',meaning:'Kết quả hoạt động trước cấu trúc vốn và thuế.',question:'Hoạt động cốt lõi có sinh lời trước tác động của vay nợ?',source:'Công thức mô hình hóa giản lược.'},
    {id:'finance_cost',layer:4,x:1020,name:'Chi phí tài chính',unit:'đồng',formula:'Lãi vay + chi phí vốn liên quan',meaning:'Chi phí của cấu trúc tài trợ và nợ vay.',question:'Đòn bẩy tài chính có làm lợi nhuận biến động quá mức?',source:'KHKD 2026 minh họa chi phí tài chính khoảng 1,87 tỷ đồng.'},
    {id:'net_profit',layer:4,x:1110,name:'Lợi nhuận sau thuế',unit:'đồng',formula:'(LN trước lãi vay & thuế − chi phí tài chính) × (1 − thuế suất)',meaning:'Lợi nhuận còn lại sau chi phí tài chính và thuế.',question:'Lợi nhuận có bền vững và quy đổi thành dòng tiền?',source:'KHKD 2026 minh họa LNST khoảng 5,98 tỷ đồng, biên khoảng 8,6%.'},

    {id:'net_profit_vehicle',layer:5,x:350,name:'LNST/xe/tháng',unit:'đồng/xe/tháng',formula:'LNST ÷ số xe hoạt động ÷ số tháng',meaning:'Chỉ số năng suất lợi nhuận của tài sản xe theo thời gian.',question:'Sản phẩm nào tạo nhiều lợi nhuận nhất trên một xe và vì sao?',source:'Chỉ số kinh tế cốt lõi đã dùng trong phân tích sản phẩm HVXT.'},
    {id:'nopat',layer:5,x:620,name:'LN hoạt động sau thuế',unit:'đồng',formula:'LN trước lãi vay & thuế × (1 − thuế suất)',meaning:'Lợi nhuận hoạt động sau thuế, chưa trộn tác động cấu trúc tài trợ.',question:'Hoạt động kinh doanh tạo bao nhiêu lợi nhuận độc lập với vay nợ?',source:'Công thức phục vụ tính tỷ suất sinh lời trên vốn đầu tư.'},
    {id:'invested_capital',layer:5,x:820,name:'Vốn đầu tư',unit:'đồng',formula:'Vốn lưu động hoạt động + tài sản cố định ròng',meaning:'Nguồn vốn dài hạn đang được dùng để vận hành sản phẩm.',question:'Bao nhiêu vốn đang bị khóa trong xe và hạ tầng chưa sử dụng hiệu quả?',source:'Cần chuẩn hóa phạm vi vốn theo chính sách tài chính Hải Vân.'},
    {id:'roic',layer:5,x:1040,name:'Tỷ suất sinh lời trên vốn đầu tư',unit:'%',formula:'LN hoạt động sau thuế ÷ vốn đầu tư',meaning:'Mức lợi nhuận hoạt động sau thuế tạo ra trên mỗi đồng vốn.',question:'Tỷ suất sinh lời tăng thêm có vượt chi phí vốn trong kịch bản bất lợi?',source:'Chỉ số kiểm chứng quyết định đầu tư; phạm vi tính cần được Tài chính phê chuẩn.'}
  ];

  const relations = [
    ['fleet','total_trips','formula','+'],['trip_vehicle_day','total_trips','formula','+'],['capacity','pax_trip','formula','+'],['load_factor','pax_trip','formula','+'],
    ['total_trips','passenger_revenue','formula','+'],['pax_trip','passenger_revenue','formula','+'],['net_yield','passenger_revenue','formula','+'],
    ['total_trips','cargo_revenue','formula','+'],['cargo_trip','cargo_revenue','formula','+'],['passenger_revenue','total_revenue','formula','+'],['cargo_revenue','total_revenue','formula','+'],
    ['total_trips','revenue_km','formula','+'],['revenue_km','variable_cost','formula','+'],['fuel_km','variable_cost','formula','+'],['maintenance_km','variable_cost','formula','+'],['total_trips','variable_cost','formula','+'],['labor_trip','variable_cost','formula','+'],['channel_cost','variable_cost','formula','+'],
    ['total_revenue','contribution','formula','+'],['variable_cost','contribution','formula','−'],['contribution','ebit','formula','+'],['depreciation','ebit','formula','−'],['admin_cost','ebit','formula','−'],
    ['ebit','net_profit','formula','+'],['finance_cost','net_profit','formula','−'],['net_profit','net_profit_vehicle','formula','+'],['fleet','net_profit_vehicle','formula','−'],['ebit','nopat','formula','+'],['nopat','roic','formula','+'],['invested_capital','roic','formula','−'],
    ['marketing','market_demand','positive','+'],['marketing','load_factor','positive','+'],['channel_reach','market_demand','positive','+'],['marketing','channel_cost','positive','+'],['channel_reach','channel_cost','positive','+'],
    ['market_demand','load_factor','positive','+'],['net_yield','load_factor','negative','−'],['total_trips','load_factor','negative','−'],
    ['fleet','depreciation','positive','+'],['fleet','invested_capital','positive','+'],['trip_vehicle_day','net_profit_vehicle','positive','+'],['fuel_km','net_profit_vehicle','negative','−']
  ].map((r,i)=>({id:`r${i}`,from:r[0],to:r[1],type:r[2],sign:r[3]}));

  const byId = Object.fromEntries(nodes.map(n => [n.id,n]));
  const canvas = document.getElementById('indexModelCanvas');
  if (!canvas) return;
  const layerBox = document.getElementById('modelLayers');
  const nodeBox = document.getElementById('modelNodes');
  const svg = document.getElementById('relationSvg');
  const panel = document.getElementById('nodeSidePanel');
  const layerHeight = 188;

  layers.forEach((name,i) => {
    const band = document.createElement('div');
    band.className = 'model-layer';
    band.style.top = `${i*layerHeight}px`;
    band.style.height = `${layerHeight}px`;
    band.innerHTML = `<div class="model-layer-label"><span>LỚP ${i+1}</span>${name}</div>`;
    layerBox.appendChild(band);
  });

  nodes.forEach(n => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'model-node';
    button.dataset.nodeId = n.id;
    button.style.left = `${n.x}px`;
    button.style.top = `${n.layer*layerHeight + layerHeight/2}px`;
    button.innerHTML = `<small>${layers[n.layer]}</small><strong>${n.name}</strong><span class="node-unit">${n.unit}</span>`;
    button.addEventListener('click',()=>selectNode(n.id));
    nodeBox.appendChild(button);
  });

  function marker(id,color) {
    return `<marker id="${id}" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8 z" fill="${color}"/></marker>`;
  }

  function drawRelations() {
    svg.setAttribute('viewBox',`0 0 ${canvas.clientWidth} ${canvas.clientHeight}`);
    svg.innerHTML = `<defs>${marker('arrow-formula','#274b5a')}${marker('arrow-positive','#14866d')}${marker('arrow-negative','#c24e43')}</defs>`;
    relations.forEach(r => {
      const a = byId[r.from], b = byId[r.to];
      const y1 = a.layer*layerHeight + layerHeight/2;
      const y2 = b.layer*layerHeight + layerHeight/2;
      let x1 = a.x, x2 = b.x, d, lx, ly;
      if (a.layer === b.layer) {
        const direction = x2 >= x1 ? 1 : -1;
        x1 += 79*direction; x2 -= 79*direction;
        const bend = 34 + (Number(r.id.slice(1))%3)*10;
        d = `M ${x1} ${y1} C ${x1 + 35*direction} ${y1-bend}, ${x2 - 35*direction} ${y2-bend}, ${x2} ${y2}`;
        lx=(x1+x2)/2; ly=y1-bend+5;
      } else {
        const direction = y2 >= y1 ? 1 : -1;
        const y1a = y1 + 41*direction;
        const y2a = y2 - 41*direction;
        const midY=(y1a+y2a)/2;
        d=`M ${x1} ${y1a} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2a}`;
        lx=(x1+x2)/2; ly=midY-5;
      }
      const path=document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d',d);path.setAttribute('class',`relation-path ${r.type}`);path.dataset.relationId=r.id;path.dataset.from=r.from;path.dataset.to=r.to;path.dataset.type=r.type;path.setAttribute('marker-end',`url(#arrow-${r.type})`);svg.appendChild(path);
      const label=document.createElementNS('http://www.w3.org/2000/svg','text');
      label.setAttribute('x',lx);label.setAttribute('y',ly);label.setAttribute('text-anchor','middle');label.setAttribute('class',`relation-label ${r.type}`);label.dataset.relationId=r.id;label.textContent=r.type==='formula'?r.sign:`${r.sign}`;svg.appendChild(label);
    });
    applyFilter(currentFilter);
  }

  function relationLabel(r) {
    if (r.type==='formula') return `Công thức ${r.sign}`;
    return r.type==='positive' ? 'Tác động thuận (+)' : 'Tác động nghịch (−)';
  }

  function selectNode(id) {
    const n=byId[id];
    const connected=relations.filter(r=>r.from===id||r.to===id);
    const neighbors=new Set([id,...connected.flatMap(r=>[r.from,r.to])]);
    document.querySelectorAll('.model-node').forEach(el=>{el.classList.toggle('active',el.dataset.nodeId===id);el.classList.toggle('dimmed',!neighbors.has(el.dataset.nodeId));});
    svg.querySelectorAll('.relation-path,.relation-label').forEach(el=>{const match=connected.some(r=>r.id===el.dataset.relationId);el.classList.toggle('focused',match);el.classList.toggle('hidden-relation',!match || (currentFilter!=='all' && el.dataset.type && el.dataset.type!==currentFilter));});
    const incoming=connected.filter(r=>r.to===id), outgoing=connected.filter(r=>r.from===id);
    const list = arr => arr.length ? `<ul>${arr.map(r=>{const other=byId[r.from===id?r.to:r.from];return `<li><span class="relation-pill ${r.type}">${relationLabel(r)}</span> ${other.name}</li>`}).join('')}</ul>` : '<p>Không có liên kết trực tiếp trong sơ đồ hiện tại.</p>';
    panel.innerHTML=`<div class="node-panel-head"><span class="node-panel-kicker">LỚP ${n.layer+1} · ${layers[n.layer]}</span><h3>${n.name}</h3><p>${n.meaning}</p></div><div class="node-panel-formula"><small>CÔNG THỨC / CÁCH TÍNH</small><code>${n.formula}</code><small style="margin-top:.65rem">ĐƠN VỊ · ${n.unit}</small></div><div class="node-panel-block"><h4>BIẾN ĐẦU VÀO / TÁC ĐỘNG ĐẾN</h4>${list(incoming)}</div><div class="node-panel-block"><h4>ĐẦU RA / TÁC ĐỘNG TIẾP</h4>${list(outgoing)}</div><div class="node-panel-block"><h4>CÂU HỎI QUẢN TRỊ</h4><p><b>${n.question}</b></p></div><div class="node-panel-block"><h4>TRẠNG THÁI NGUỒN</h4><p>${n.source}</p></div>`;
    if (window.innerWidth<=1050) panel.scrollIntoView({behavior:'smooth',block:'nearest'});
  }

  let currentFilter='all';
  function applyFilter(filter) {
    currentFilter=filter;
    document.querySelectorAll('[data-relation-filter]').forEach(b=>{const on=b.dataset.relationFilter===filter;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
    svg.querySelectorAll('.relation-path,.relation-label').forEach(el=>{const type=el.dataset.type || relations.find(r=>r.id===el.dataset.relationId)?.type;el.classList.toggle('hidden-relation',filter!=='all'&&type!==filter);});
    document.querySelectorAll('.model-node').forEach(el=>el.classList.remove('dimmed'));
  }
  document.querySelectorAll('[data-relation-filter]').forEach(b=>b.addEventListener('click',()=>applyFilter(b.dataset.relationFilter)));
  drawRelations();
  selectNode('total_revenue');
  window.addEventListener('resize',()=>requestAnimationFrame(drawRelations));
})();
