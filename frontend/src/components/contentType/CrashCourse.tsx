import type { FetchContentResult } from '@enonic/nextjs-adapter/src/types'
import { getCrashCourseSlideContents } from '~/components/queries/crash-course'
import CrashCourseView from '~/components/views/CrashCourseView'
import MainView from '@enonic/nextjs-adapter/views/MainView'

export default async function CrashCourse(props: FetchContentResult) {
    const slideContents = await getCrashCourseSlideContents(props)

    return (
        <CrashCourseView
            slideDeckElements={slideContents.map((slide, i) => (
                <MainView key={i} {...slide} />
            ))}
        />
    )
}
