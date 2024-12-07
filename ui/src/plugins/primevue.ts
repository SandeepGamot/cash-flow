import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// PrimeVue Components
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import AutoComplete from 'primevue/autocomplete'
import Avatar from 'primevue/avatar'
import BlockUI from 'primevue/blockui'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Card from 'primevue/card'
import Chip from 'primevue/chip'
import Column from 'primevue/column'
import ConfirmDialog from 'primevue/confirmdialog'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import Dropdown from 'primevue/dropdown'
import FileUpload from 'primevue/fileupload'
import Image from 'primevue/image'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Listbox from 'primevue/listbox'
import Menu from 'primevue/menu'
import Message from 'primevue/message'
import MultiSelect from 'primevue/multiselect'
import OverlayPanel from 'primevue/overlaypanel'
import Paginator from 'primevue/paginator'
import Panel from 'primevue/panel'
import PanelMenu from 'primevue/panelmenu'
import Portal from 'primevue/portal'
import ProgressBar from 'primevue/progressbar'
import ProgressSpinner from 'primevue/progressspinner'
import RadioButton from 'primevue/radiobutton'
import Ripple from 'primevue/ripple'
import SelectButton from 'primevue/selectbutton'
import Sidebar from 'primevue/sidebar'
import Skeleton from 'primevue/skeleton'
import TabMenu from 'primevue/tabmenu'
import Tag from 'primevue/tag'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'
import Toolbar from 'primevue/toolbar'
import Tree from 'primevue/tree'
import VirtualScroller from 'primevue/virtualscroller'

import ConfirmationService from 'primevue/confirmationservice'
import FocusTrap from 'primevue/focustrap'
import ToastService from 'primevue/toastservice'
import { definePreset } from '@primevue/themes'
import Select from 'primevue/select'

const Noir = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{zinc.50}',
      100: '{zinc.100}',
      200: '{zinc.200}',
      300: '{zinc.300}',
      400: '{zinc.400}',
      500: '{zinc.500}',
      600: '{zinc.600}',
      700: '{zinc.700}',
      800: '{zinc.800}',
      900: '{zinc.900}',
      950: '{zinc.950}'
    },
    colorScheme: {
      light: {
        primary: {
          color: '{zinc.950}',
          inverseColor: '#ffffff',
          hoverColor: '{zinc.900}',
          activeColor: '{zinc.800}'
        },
        highlight: {
          background: '{zinc.950}',
          focusBackground: '{zinc.700}',
          color: '#ffffff',
          focusColor: '#ffffff'
        }
      },
      dark: {
        primary: {
          color: '{zinc.50}',
          inverseColor: '{zinc.950}',
          hoverColor: '{zinc.100}',
          activeColor: '{zinc.200}'
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)'
        }
      }
    }
  }
})

export default {
  install(app: any) {
    /* eslint-disable vue/multi-word-component-names, vue/no-reserved-component-names */
    // app.component('Accordion', Accordion)
    // app.component('AccordionTab', AccordionTab)
    // app.component('AutoComplete', AutoComplete)
    // app.component('Avatar', Avatar)
    // app.component('BlockUI', BlockUI)
    app.component('Button', Button)
    // app.component('Calendar', Calendar)
    // app.component('Card', Card)
    // app.component('Chip', Chip)
    // app.component('Column', Column)
    // app.component('ConfirmDialog', ConfirmDialog)
    // app.component('DataTable', DataTable)
    // app.component('Dialog', Dialog)
    app.component('Divider', Divider)
    // app.component('Dropdown', Dropdown)
    // app.component('Image', Image)
    app.component('InputGroup', InputGroup)
    app.component('InputGroupAddon', InputGroupAddon)
    app.component('InputNumber', InputNumber)
    app.component('InputText', InputText)
    // app.component('FileUpload', FileUpload)
    // app.component('Listbox', Listbox)
    // app.component('Menu', Menu)
    // app.component('Message', Message)
    // app.component('MultiSelect', MultiSelect)
    // app.component('OverlayPanel', OverlayPanel)
    // app.component('Paginator', Paginator)
    app.component('ProgressBar', ProgressBar)
    // app.component('Panel', Panel)
    // app.component('PanelMenu', PanelMenu)
    // app.component('Portal', Portal)
    app.component('ProgressSpinner', ProgressSpinner)
    // app.component('ProgressBar', ProgressBar)
    // app.component('RadioButton', RadioButton)
    app.component('Select', Select)
    // app.component('SelectButton', SelectButton)
    // app.component('Sidebar', Sidebar)
    app.component('Skeleton', Skeleton)
    // app.component('TabMenu', TabMenu)
    // app.component('Tag', Tag)
    app.component('Textarea', Textarea)
    app.component('Toast', Toast)
    // app.component('Toolbar', Toolbar)
    // app.component('Tree', Tree)
    // app.component('VirtualScroller', VirtualScroller)

    app.directive('ripple', Ripple)
    app.directive('focustrap', FocusTrap)
    /* eslint-enable vue/multi-word-component-names, vue/no-reserved-component-names */

    app.use(PrimeVue, {
      ripple: true,
      theme: {
        preset: Noir,
        options: {
          darkModeSelector: '.app-dark-mode'
        }
      }
    })
    app.use(ConfirmationService)
    app.use(ToastService)
  }
}
