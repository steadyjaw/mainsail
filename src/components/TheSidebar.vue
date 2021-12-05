<style>
    .nav-logo {
        height: 32px;
    }
    .small-list-item {
        height: var(--sidebar-menu-item-height);
    }
    .no-text-decoration {
        text-decoration: none;
        background-color: transparent;
    }
    .no-background:before {
        background-color: rgba(255, 255, 255, 0) !important;
    }
</style>
<style scoped>
    .active-nav-item {
        border-right: 4px solid var(--v-primary-base);
    }
    .menu-item-icon {
        opacity: .85;
    }
    .menu-item-title {
        line-height: 30px;
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        opacity: .85;
    }
    a.nav-logo, a.nav-logo.active-nav-item, a.nav-logo.active-nav-item::before {
        border: 0;
        text-decoration: none;
        background-color: transparent;
    }
    a.nav-logo:hover::before {
        opacity: 0;
    }
</style>

<template>
<<<<<<< Updated upstream
    <v-navigation-drawer v-model="naviDrawer" :src="sidebarBackground" :mini-variant="(navigationStyle === 'iconsOnly')" :key="navigationStyle" :width="navigationWidth" clipped app> 
=======
<<<<<<< Updated upstream
    <v-navigation-drawer v-model="naviDrawer" :src="sidebarBackground" :mini-variant="(navigationStyle === 'iconsOnly')" :key="navigationStyle" width="220px" clipped app> 
=======
    <!-- <v-navigation-drawer 
        :value="true"
        :src="sidebarBackground" 
        :key="$vuetify.breakpoint.mobile + isTouchDevice" 
        :width="navigationWidth" 
        :mini-variant="naviMini" 
        :stateless="naviStateless" 
        :hide-overlay="naviStateless" 
        clipped
        app
    > -->
        <!-- :style="!naviDrawer ? 'top: ' + $vuetify.application.top + 'px;max-height: calc(100% - 48px);': ''"  -->
        <!-- :style="`margin-top: ${$vuetify.application.top}px`">  -->
    <!-- <v-navigation-drawer v-model="naviDrawer" :src="sidebarBackground" :mini-variant="(navigationStyle === 'iconsOnly')" :key="navigationStyle" :width="navigationWidth" clipped app>  -->
    <v-navigation-drawer
        v-model="naviDrawer"
        :src="sidebarBackground"
        :mini-variant.sync="naviMini"
        :width="navigationWidth"
        clipped
        app
    > 
>>>>>>> Stashed changes
>>>>>>> Stashed changes
        <v-list class="pr-0 pt-0 ml-0">
            <v-list-item-group active-class="active-nav-item">
                <template v-if="$vuetify.breakpoint.mobile">
                    <v-list-item 
                        router to="/"
                        class="small-list-item align-center justify-center no-text-decoration nav-logo"
                        :ripple="false"
                    >
                        <template v-if="sidebarLogo">
                            <img :src="sidebarLogo" style="height: 32px;" class="nav-logo d-none d-sm-flex" alt="Logo" />
                        </template>
                        <template v-else>
                            <mainsail-logo :color="logoColor" style="height: 32px;" class="nav-logo" router to="/" :ripple="false"></mainsail-logo>
                        </template>
                    </v-list-item>
                </template>
                <template v-if="countPrinters">
                    <v-divider class="my-1 d-block d-sm-none"></v-divider>
                    <v-list-item 
                        router to="/allPrinters"
                        class="small-list-item"
                    >
                        <v-list-item-icon class="my-3 mr-3 menu-item-icon">
                            <v-icon>mdi-view-dashboard-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title tile class="menu-item-title">{{ $t("App.Printers")}}</v-list-item-title>
                        </v-list-item-content>

                    </v-list-item>
                    <v-divider class="my-1"></v-divider>
                </template>
                <div v-for="(category, index) in naviPoints" :key="index"> 
                    <v-list-item 
                        router :to="category.path"
                        v-if="showInNavi(category)"
                        class="small-list-item"
                        @click.stop="naviMini ? naviMini = naviMini : naviMini = !naviMini"
                    >
                        <v-list-item-icon class="my-3 mr-3 menu-item-icon">
                            <v-icon>mdi-{{ category.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title tile class="menu-item-title">{{ $t(`Router.${category.title}`) }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </div>
            </v-list-item-group>
        </v-list>
        <template v-slot:append>
            <v-list-item class="small-list-item mb-2">
                <v-list-item-icon class="menu-item-icon">
                    <about-modal></about-modal>
                </v-list-item-icon>
            </v-list-item>
        </template>
    </v-navigation-drawer>  
</template>

<script lang="ts">
import Component from 'vue-class-component'
import routes, {AppRoute} from '@/routes'
import {Mixins} from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import {PrinterStateKlipperConfig} from '@/store/printer/types'
import TheSelectPrinterDialog from '@/components/TheSelectPrinterDialog.vue'
import AboutModal from '@/components/modals/AboutModal.vue'
<<<<<<< Updated upstream
import {navigationWidth} from '@/store/variables'
=======
<<<<<<< Updated upstream
=======
import {navigationWidth} from '@/store/variables'
import MainsailLogo from '@/components/ui/MainsailLogo.vue'
>>>>>>> Stashed changes
>>>>>>> Stashed changes

@Component({
    components: {
        TheSelectPrinterDialog,
        AboutModal,
        MainsailLogo
    }
})

export default class TheSidebarAlt extends Mixins(BaseMixin) {
    navigationWidth = navigationWidth

    get naviDrawer(): boolean {
        return this.$store.state.naviDrawer
    }

    set naviDrawer(newVal: boolean) {
        if(this.$vuetify.breakpoint.mobile){
            this.$store.dispatch('setNaviDrawer', newVal)
        } else {
            this.$store.dispatch('setNaviDrawer', true)
        }
    }

    get naviMini(): boolean {
        return this.$store.state.naviMini ?? true
    }
    
    set naviMini(newVal) {
        this.$store.dispatch('setNaviMini', newVal)
    }

    get naviTemp(): boolean {
        if(this.$vuetify.breakpoint.mobile){
            return false
        } else {
            return !this.naviMini
        }
    }

    set naviTemp(newVal: boolean) {
        if(!newVal) {
            this.naviMini = true
        }
    }

    get navigationStyle() {
        return this.$store.state.gui.dashboard.navigationStyle
    }

    get sidebarBackground(): string {
        return this.$store.getters['files/getSidebarBackground']
    }

    get naviPoints(): AppRoute[] {
        return routes.filter((element) => element.showInNavi)
    }

    get klippy_state(): string {
        return this.$store.state.server.klippy_state
    }

    get boolNaviWebcam(): boolean {
        return this.$store.state.gui.webcamSettings.boolNavi
    }

    get moonrakerComponents(): string[] {
        return this.$store.state.server.components
    }

    get registeredDirectories(): string[] {
        return this.$store.state.server.registered_directories
    }

    get klipperConfigfileSettings(): PrinterStateKlipperConfig[] {
        return this.$store.state.printer.configfile?.settings ?? {}
    }

    get currentPage(): string {
        return this.$route.fullPath
    }

    get isUpdateAvailable(): boolean {
        return this.$store.getters['server/updateManager/isUpdateAvailable']
    }

    get countPrinters() {
        return this.$store.getters['farm/countPrinters']
    }

    get logoColor(): string {
        return this.$store.state.gui.theme.logo
    }

    showInNavi(route: AppRoute): boolean {
        if (['shutdown', 'error', 'disconnected'].includes(this.klippy_state) && !route.alwaysShow) return false

        if (route.title === 'Webcam') return this.boolNaviWebcam

        if (route.moonrakerComponent) return this.moonrakerComponents.includes(route.moonrakerComponent)
        if (route.registeredDirectory) return this.registeredDirectories.includes(route.registeredDirectory)
        if (route.klipperComponent) return (route.klipperComponent in this.klipperConfigfileSettings)

        return true
    }

    clickNaviItem() {
        if(this.isTouchDevice && !this.$vuetify.breakpoint.mobile && this.naviDrawer){
            this.naviDrawer = true
        } else if(this.$vuetify.breakpoint.mobile && this.naviDrawer) {
            this.naviDrawer = false
        }
    }
    mounted() {
        this.naviDrawer = this.$vuetify.breakpoint.lgAndUp
    }
}
</script>