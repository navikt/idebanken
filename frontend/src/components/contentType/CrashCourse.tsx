import MainView from '@enonic/nextjs-adapter/views/MainView'
import type { FetchContentResult } from '@enonic/nextjs-adapter/src/types'
import { getCrashCourseSlideContents } from '~/components/queries/crash-course'

export default async function CrashCourse(props: FetchContentResult) {
    const slideContents = await getCrashCourseSlideContents(props)
    console.log('CrashCourse data:', slideContents)

    return (
        <>
            {slideContents.map((slide, index) => (
                <MainView {...slide} key={index} />
            ))}
        </>
    )
}
