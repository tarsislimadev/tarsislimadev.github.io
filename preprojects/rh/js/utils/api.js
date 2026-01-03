import * as Ajax from './ajax.js'

export const usersRegister = ({ email, password }) => Ajax.post(['users', 'register'], { email, password })

export const usersLogin = ({ email, password }) => Ajax.post(['users', 'login'], { email, password })

export const jobsList = ({ }) => Ajax.get(['jobs'], {})

export const jobsSave = ({
  name, type,
  schedule, description,
  company_name, company_location,
  salary_min, salary_max,
}) => Ajax.post(['jobs', 'save'], {
  name, type,
  schedule, description,
  company_name, company_location,
  salary_min, salary_max,
})
