import {CATCH_ALL, ComponentRegistry, APP_NAME} from '@enonic/nextjs-adapter';
import PropsView from '@enonic/nextjs-adapter/views/PropsView';
import {commonQuery, commonVariables} from './queries/common';
import getPerson from './queries/getPerson';
import Person from './views/Person';
import MainPage from './pages/Main';

import "@enonic/nextjs-adapter/baseMappings";
import ChildList, { childListProcessor, getChildList } from './parts/ChildList';
import Heading from './parts/Heading';
import TwoColumnLayout from './layouts/TwoColumnLayout';
import MovieDetails, { getMovie } from './parts/MovieDetails';
import { ButtonView } from './parts/Button';
import { TextEditorView } from './parts/TextEditor';
import { InfoBoxView } from './parts/InfoBox';
import { DoubleInfoBoxView } from './parts/DoubleInfoBox';
import SingleColumnLayout from './layouts/SingleColumnLayout';
import { TipPanelView } from './parts/TipPanel';
import { AccordionView } from './parts/Accordion';
import PanelLayoutTwoColumn from './layouts/PanelLayoutTwoColumn';

// You can set common query for all views here
ComponentRegistry.setCommonQuery([commonQuery, commonVariables]);

// Content type mappings
ComponentRegistry.addContentType(`${APP_NAME}:person`, {
    query: getPerson,
    view: Person
});


// Page mappings
ComponentRegistry.addPage(`${APP_NAME}:main`, {
    view: MainPage
});


// Layout mappings
ComponentRegistry.addLayout(`${APP_NAME}:single-column`, {
    view: SingleColumnLayout
});
ComponentRegistry.addLayout(`${APP_NAME}:2-column`, {
    view: TwoColumnLayout
});
ComponentRegistry.addLayout(`${APP_NAME}:panel-2-column`, {
    view: PanelLayoutTwoColumn
});

// Part mappings
ComponentRegistry.addPart(`${APP_NAME}:child-list`, {
    query: getChildList,
    processor: childListProcessor,
    view: ChildList
});
ComponentRegistry.addPart(`${APP_NAME}:heading`, {
    view: Heading
});
ComponentRegistry.addPart(`${APP_NAME}:movie-details`, {
    query: getMovie,
    view: MovieDetails
});

ComponentRegistry.addPart(`${APP_NAME}:button`, {
    view: ButtonView
});

ComponentRegistry.addPart(`${APP_NAME}:text-editor`, {
    view: TextEditorView,
});

ComponentRegistry.addPart(`${APP_NAME}:info-box`, {
    view: InfoBoxView,
});

ComponentRegistry.addPart(`${APP_NAME}:double-info-box`, {
    view: DoubleInfoBoxView,
});

ComponentRegistry.addPart(`${APP_NAME}:tip-panel`, {
    view: TipPanelView,
});

ComponentRegistry.addPart(`${APP_NAME}:accordion`, {
    view: AccordionView,
});


// Debug
// ComponentRegistry.addContentType(CATCH_ALL, {
//     view: PropsView
// });
