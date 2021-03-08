import Queue from 'bull'
const fila = new Queue('sendMail');

fila.on('completed', async (job, erro) => {
  if (job.isCompleted()) {
    // await fila.client.disconnect()
  }
  console.log("JOB Complete => ", job.data)
  console.log("erro => ", erro)
})

fila.on('active', async (job, erro) => {
  if (job.isActive()) {
    // await fila.client.disconnect()
  }
  console.log("JOB Active => ", job.data)
  console.log("erro => ", erro)
})


fila.process(async (job) => {
  if (job.isWaiting()) {
    // job.moveToCompleted()
  } else if (job.isFailed()) {
    job.retry()
  }
  console.log(job.data)
})
export default fila
