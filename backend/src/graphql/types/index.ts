import path from 'path'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas-ts'
/**todos nuestro esquemas se van amerchar y aparecer en uno solo */
const typesArray = fileLoader(path.join(__dirname, './'))
export default mergeTypes(typesArray, { all: true })
