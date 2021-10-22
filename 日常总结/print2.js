function handleWindowPrint(ele, fileName){

  var oIframe = document.createElement('iframe');
  var oScript = document.createElement('script');

  document.body.appendChild(oIframe);

  var titleText = document.head.getElementsByTagName('title')[0].innerText;
  document.head.getElementsByTagName('title')[0].innerText = `${fileName}`;
//<link rel="stylesheet"  type="text/css" href="./contract.css"/>
  oIframe.contentDocument.head.innerHTML = `<meta charset="utf-8">
                                            <title>${fileName}</title>
                                            <meta name="format-detection" content="telephone=no">
                                            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
                                            <meta name="viewport" content="width=device-width,initial-scale=1.0">

                                            <style>
                                              #demo{
                                                width: max-content;
                                                height: max-content;
                                                position: absolute;
                                                top: 0;
                                                left: 0;
                                                right: 0;
                                                bottom: 0;
                                                margin: 0 auto;
                                              }
                                              table{ border-collapse:collapse;}
                                              table td{ border:2px solid #000000; width:104px; height:35px; text-align:center; table-layout:fixed;word-break:break-all;}
											  @page {
												size: auto;
												margin-top: 0mm;
												margin-bottom: 0mm;
												backgroundImage: none;
												}
                                            </style>`;
                                            // table thead .th1{font-size:26px;}
                                            // table thead .th2{position:relative;right:210px;top:-1px;}
  // oIframe.contentWindow.document.body.innerHTML = document.querySelector(ele).outerHTML;
  oIframe.contentDocument.body.innerHTML = document.querySelector(ele).outerHTML;
  oScript.innerHTML = 'window.print();';
  oIframe.contentDocument.body.appendChild(oScript);
  document.body.removeChild(oIframe);
  document.head.getElementsByTagName('title')[0].innerText = titleText;
  if (window.matchMedia) {
    var mediaQueryList = window.matchMedia('print');

    //为印添加事件
    mediaQueryList.addListener(function (mql) {
        if (mql.matches) {
            // beforePrint();
        } else {
            // afterPrint();
            window.history.go(-1)
        }
    });
  }
}

export default {
  handleWindowPrint
}
