import platformConfig from "./src/config/app-config";
import { checkBucketExists, createBucket } from "./src/lib/storage/storage";

export async function register() {

    if (!platformConfig.variables.SUPABASE_BUCKET_NAME) {
        throw new Error('SUPABASE_BUCKET_NAME is not defined')
    }

    const bucketExists = await checkBucketExists(platformConfig.variables.SUPABASE_BUCKET_NAME)
    if (!bucketExists) {
        // create bucket
        const bucketName = await createBucket(platformConfig.variables.SUPABASE_BUCKET_NAME)

        console.log(`Bucket ${bucketName} created`)
    }
}