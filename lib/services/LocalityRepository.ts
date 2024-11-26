import type Locality from '@/lib/entities/Locality'

class LocalityRepository {
    static async getLocalities() {
        const res = await fetch(`${process.env.GREENALERT_API_URL}/locality`)
        return res.json()
    }

    static async getById(id: Locality['id']) {
        const res = await fetch(`${process.env.GREENALERT_API_URL}/locality/id/${id}`)
        return res.json()
    }
}

export default LocalityRepository
