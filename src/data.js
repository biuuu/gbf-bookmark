import list from './data.json'

let data = {
  list : list
}

const getLocalData = () => {
  try {
    let str = localStorage.getItem('gbf-bookmark:data')
    if (str) {
      let obj = JSON.parse(str)
      if (obj && obj.length) {
        data.list = obj.sort((prev, next) => {
          const prevParent = (prev.parent | 0) * 100
          const nextParent = (next.parent | 0) * 100
          return (prev.index + prevParent) - (next.index + nextParent)
        })
      }
    }
  } catch (e) {

  }
}

getLocalData()

export default data
