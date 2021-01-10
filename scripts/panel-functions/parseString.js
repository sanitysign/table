export function parseString(str) {

  let arr = JSON.parse(str)

  if (arr.length === undefined) {
    arr = [arr]
  }

  arr = arr.map(obj => {

    const birthday = new Date(obj.birthday)

    const age = new Date(Date.now() - birthday.getTime()).getFullYear() - 1970

    let [yy, mm, dd] = [birthday.getFullYear(), birthday.getMonth() + 1, birthday.getDate()]

    mm = mm < 10 ? `0${mm}` : mm
    dd = dd < 10 ? `0${dd}` : dd

    const term = new Date().getFullYear() >= +obj.admission + 4 ? `grad.` : `${new Date().getFullYear() - obj.admission + 1} term`

    return {
      fullname: `${obj.surname} ${obj.firstname} ${obj.patronym}`,
      faculty: obj.faculty,
      birthday: `${dd}.${mm}.${yy} (${age} years)`,
      study: `${obj.admission}-${+obj.admission + 4} (${term})`,
    }
  })

  return arr
}

