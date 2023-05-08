import { BAR, SECTIONS_CATEGORIES } from "@constant/components";
import { v4 as uuid } from 'uuid';

export default {
    id: uuid(),//id used for dnd
    uid: BAR,//uniqe id used for interbnal identifications
    section: SECTIONS_CATEGORIES.HERO//category
}