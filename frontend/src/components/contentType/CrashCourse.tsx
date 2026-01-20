import type { FetchContentResult } from '@enonic/nextjs-adapter'
import { getCrashCourseSlideContents } from '~/components/queries/crash-course'
import CrashCourseView from '~/components/views/CrashCourseView'
import MainView from '@enonic/nextjs-adapter/views/MainView'

export default async function CrashCourse(props: FetchContentResult) {
    const { slides, structure } = await getCrashCourseSlideContents(props)

    return (
        <CrashCourseView
            structure={structure}
            slideDeckElements={slides.map((slide, i) => (
                <MainView key={i} {...slide} />
            ))}
        />
    )
}
