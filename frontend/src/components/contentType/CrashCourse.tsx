import type { FetchContentResult } from '@enonic/nextjs-adapter'
import { getCrashCourseSlideContents } from '~/components/queries/crash-course'
import CrashCourseView from '~/components/contentType/CrashCourseView'
import MainView from '@enonic/nextjs-adapter/views/MainView'

export default async function CrashCourse(props: FetchContentResult) {
    const { slides, structure, backlink } = await getCrashCourseSlideContents(props)

    return (
        <CrashCourseView
            structure={structure}
            backlink={backlink}
            slideDeckElements={slides.map((slide, i) => (
                <MainView key={i} {...slide} />
            ))}
            meta={props.meta}
        />
    )
}
