import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'


Vue.use(Vuetify)

export default new Vuetify({
    theme: { 
        options: {
            customProperties: true
        },
        dark: true,
        themes: {
            dark: {
                // default theme, just in case
                accent: '#424242',
                background: '#121212',
                error: '#FF5252',
                info: '#2196F3',
                logo: '#D41216',
                panel: '#1E1E1E',
                primary: '#2196F3',
                secondary: '#424242',
                success: '#4CAF50',
                text: '#FFFFFF',
                toolbar: '#272727',
                warning: '#FB8C00'
            }
        }
    },
    icons: {
        iconfont: 'mdi',
    },
    breakpoint: {
        mobileBreakpoint: 768
    }
})
