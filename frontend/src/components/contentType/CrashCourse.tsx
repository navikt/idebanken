import type { FetchContentResult } from '@enonic/nextjs-adapter/src/types'
import { getCrashCourseSlideContents } from '~/components/queries/crash-course'
import CrashCourseView from '~/components/views/CrashCourseView'

export default async function CrashCourse(props: FetchContentResult) {
    const slideContents = await getCrashCourseSlideContents(props)
    console.log('CrashCourse data:', slideContents)

    return <CrashCourseView slideContents={slideContents} />
}
