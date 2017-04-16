let imgList = document.querySelector('#list')
let imgs = document.querySelectorAll('ul img')

function setPreviewBehavior (subjects) {
  // 新建一个事件对象
  let previewEvent = document.createEvent('Event')
  // 初始化
  previewEvent.initEvent('preview', true, true)

  if (!Array.isArray(subjects)) {
    if (subjects.length) subjects = [...subjects]
    else subjects = [subjects]
  }

  // 事件对象上的属性
  previewEvent.previewTargets = subjects.map(evt => evt.src)

  subjects.forEach(subject => {
    subject.preview = () => {
      subject.dispatchEvent(previewEvent)
    }
  })
}

setPreviewBehavior(imgs)

let previewMask = document.getElementById('mask')
let previewImage = previewMask.querySelector('img')
let previewPrevious = previewMask.querySelector('.previous')
let previewNext = previewMask.querySelector('.next')

previewMask.onclick = (evt) => {
  if (evt.target === previewMask) {
    previewMask.style.display = 'none'
  }
}

imgList.addEventListener('click', (evt) => {
  if (evt.target.preview) {
    evt.target.preview()
  }
})

imgList.addEventListener('preview', (evt) => {
  let src = evt.target.src
  let imgs = evt.previewTargets
  previewMask.style.display = 'block'   
  previewImage.src = src

  let idx = imgs.indexOf(src)

  function updateButton(idx) {
    previewPrevious.style.display = idx ? 'block' : 'none'
    previewNext.style.display = idx < imgs.length - 1 ? 'block' : 'none'
  }

  updateButton(idx)

  previewPrevious.onclick = function (evt) {
    previewImage.src = imgs[--idx]
    updateButton(idx)
  }

  previewNext.onclick = function (evt) {
    previewImage.src = imgs[++idx]
    updateButton(idx)
  }
})