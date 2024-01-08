import html2canvas from 'html2canvas';
import saveAs from 'file-saver';

function downloadImage ({ node, name = 'snapshot.png', size = { width: 1920, height: 1080 }, backgroundColor = 'transparent', errorMsg = '画布尺寸太大，无法保存为图片！将视图更改为“完整视图”后重试。', tableRows }) {
  return new Promise((resolve, reject) => {
    if (!(node instanceof SVGElement)) {
      _dom2canvas({ node, size, backgroundColor, scale: 1.5, tableRows, name }).then(canvas => {
        if (canvas.toBlob) {
          canvas.toBlob(_saveBlob);
        } else if (canvas.msToBlob) {
          const blob = canvas.msToBlob();
          _saveBlob(blob);
        }

        function _saveBlob (blob) {
          let flag = false;
          if (blob === null) {
            flag = true;
          } else {
            saveAs(blob, name);
          }
          resolve(flag ? errorMsg : 'done');
        }
      });
    }
  });
}

function dom2imageUrl ({ node, size = { width: 1920, height: 1080 }, backgroundColor = 'transparent', scale = 1 }) {
  return _dom2canvas({ node, size, backgroundColor, scale }).then(canvas => {
    return canvas.toDataURL('image/png');
  });
}

function _dom2canvas ({ node, size = { width: 1920, height: 1080 }, backgroundColor = 'transparent', scale = 1.5, tableRows, name }) {
  if (typeof node === 'string') {
    node = document.querySelector(node);
  }
  return html2canvas(node, {
    width: size.width || 1920,
    height: size.height || 1080,
    scale,
    backgroundColor: backgroundColor,
    logging: false,
    useCORS: true,
    imageTimeout: 15000
  });
}

export {
  downloadImage,
  dom2imageUrl
};
