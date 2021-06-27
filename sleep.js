function sleep(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('wait' + delay)
      resolve()
    }, delay)
  })
}
sleep(100).then(() => {

})
async function sleepAsync() {
  console.log('a')
  await sleep(100)
  console.log('b')
}
sleepAsync()