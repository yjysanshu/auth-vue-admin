import createAPI from '@/utils/request'

export default {
  data() {
    return {
      loading: true,
      data: [],
      page: 1,
      limit: 10,
      total: 0,
      url: '',
      params: {},
      query: {},
      time: 170
    }
  },
  methods: {
    async init() {
      if (!await this.beforeInit()) {
        return
      }
      return new Promise((resolve, reject) => {
        this.loading = true
        this.data = []

        createAPI(this.url, 'GET', { params: this.params })
          .then(res => {
            this.data = res.data.list
            this.total = res.data.total
            setTimeout(() => {
              this.loading = false
            }, this.time)
            resolve(res)
          }).catch(err => {
            this.loading = false
            reject(err)
          })
      })
    },
    beforeInit() {
      return true
    },
    pageChange(e) {
      this.page = e
      this.init()
    },
    sizeChange(e) {
      this.page = 1
      this.limit = e
      this.init()
    }
  }
}
