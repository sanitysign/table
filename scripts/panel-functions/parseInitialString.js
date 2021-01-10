export function parseInitialString(str) {

  return str
            .split(`\n`)
            .filter(line => line.length > 10)
            .map(line => {

              let [name, surname, patronim, birthday, admission, faculty] = line
                .split(`,`)
                .map(elem => elem.trim())

              admission = +admission
              let [mm, dd, yy] = birthday.split(`/`)

              mm = mm.length === 1 ? `0${mm}` : mm
              dd = dd.length === 1 ? `0${dd}` : dd

              birthday = new Date(yy, mm - 1, dd)

              const now = new Date()

              const toCalculateTerm = new Date(now - new Date(admission, 8)).getFullYear() - new Date(0).getFullYear()
              const term = toCalculateTerm >= 4 ? `${`grad.`}` : `${toCalculateTerm + 1} term`

              const age = new Date(now - new Date(yy, mm - 1, dd)).getFullYear() - new Date(0).getFullYear()

              return {
                fullname: `${surname} ${name} ${patronim}`,
                faculty,
                birthday: `${dd}.${mm}.${yy} (${age} years)`,
                study: `${admission}-${admission + 4} (${term})`
              }
            })
}


