import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
//import {googleMapsInput} from '@sanity/google-maps-input'
import {schemaTypes} from './schemas'
import { RiFootballFill } from 'react-icons/ri'

export default defineConfig([{
  name: 'belongings',
  title: 'belongings',
  basePath: '/dev',
  projectId: 'qutxk4zb',
  dataset: 'dev',
  icon: RiFootballFill, 

  plugins: [
    deskTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  // tools: [
  //   {name: 'my-tool', title: 'My Tool', component: (<h1>hello</h1>)},
  //   {name: 'tool-2', title: '2nd Tool', component: MyOtherTool},
  // ],
},
{
  projectId: 'qutxk4zb',
  dataset: 'production',
  name: 'production',
  title: 'Production belongings',
  basePath: '/production',
  icon: RiFootballFill, 
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
}])
