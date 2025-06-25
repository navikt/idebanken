// If ie. a fragment was updated, we need to update all documents that reference it
export const updateExternalSearchDocumentsForAllReferences = (
    _contentId: string,
    _repoId: string
) => {
    // Todo: Implement this function to update all references to the content
    return
    // Search for all references to this content and update each
    // const contentReferenceFinder = new ReferencesFinder({
    //     contentId,
    //     branch: 'master',
    //     repoId,
    //     withDeepSearch: true,
    //     timeout: REFERENCE_SEARCH_TIMEOUT_MS,
    // });
    //
    // const references = contentReferenceFinder.run();
    //
    // if (!references) {
    //     return;
    // }
    //
    // references.forEach((content) => {
    //     updateExternalSearchDocumentForContent(content._id, repoId);
    // });
}
