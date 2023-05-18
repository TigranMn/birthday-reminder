import axios from 'axios'

export default function handle() {
  axios.post('/api/sign-up', {
    email: 'cron@mail.ru',
    password: 'cronjob',
    fullName: 'Cron Cronovich'
  })
}
