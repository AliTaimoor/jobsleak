
import platformConfig from '@/config/app-config';
import { createClient } from '@supabase/supabase-js'






const getClient = () => {
    // Create a single supabase client for interacting with your database
    if (!platformConfig.variables.SUPABASE_URL) {
        console.error('SUPABASE_URL is not defined')
        return null
    }
    if (!platformConfig.variables.SUPABASE_ANON_KEY) {
        console.error('SUPABASE_ANON_KEY is not defined')

        return null
    }
    const supabase = createClient(platformConfig.variables.SUPABASE_URL, platformConfig.variables.SUPABASE_ANON_KEY)

    return supabase
}

const checkBucketExists = async (bucketName: string) => {

    const supabase = getClient()
    if (!supabase) {
        return false
    }
    const { data, error } = await supabase.storage.from(bucketName).list()
    if (error) {
        console.error(error)
        return false
    }
    return data
}

const createBucket = async (bucketName: string) => {
    const supabase = getClient()
    if (!supabase) {
        return false
    }

    const { data, error } = await supabase.storage.createBucket(bucketName)
    if (error) {
        console.error(error)
        return false
    }
    return data
}

const deleteBucket = async (bucketName: string) => {
    const supabase = getClient()
    if (!supabase) {
        return false
    }
    const { data, error } = await supabase.storage.deleteBucket(bucketName)
    if (error) {
        console.error(error)
        return false
    }
    return data
}
const uploadFile = async (bucketName: string, path: string, file: File, options: any) => {
    const supabase = getClient()
    if (!supabase) {
        return false
    }
    const { data, error } = await supabase.storage.from(bucketName).upload(path, file, options)
    if (error) {
        console.error(error)
        return false
    }
    return data
}

const getDownloadUrl = async (bucketName: string, path: string) => {
    const supabase = getClient()
    if (!supabase) {
        return false
    }
    const { data } = await supabase.storage.from(bucketName).getPublicUrl(path)
    return data
}


export { checkBucketExists, createBucket, deleteBucket, uploadFile, getDownloadUrl }



export default getClient;