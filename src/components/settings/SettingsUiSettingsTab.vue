<template>
    <div>
        <v-card flat>
            <template v-if="boolThemeEditor">
                <v-card-title class="text--secondary">{{ $t('Settings.UiSettingsTab.ThemeEditor') }}</v-card-title>
                <v-card-text style="overfow-y: scroll;">
                    <settings-row :title="$t('Settings.UiSettingsTab.Name')">
                        <v-text-field
                            v-model="editTheme.title"
                            hide-details="auto"
                            :rules="[rules.required, rules.themeTitle]"
                            dense
                            outlined
                        ></v-text-field>
                    </settings-row>
                    <settings-row :title="$t('Settings.UiSettingsTab.Description')">
                        <v-textarea
                            v-model="editTheme.description"
                            hide-details="auto"
                            auto-grow
                            rows="1"
                            :rules="[rules.required, rules.themeDescLength]"
                            dense
                            outlined
                        ></v-textarea>
                    </settings-row>
                    <v-divider class="mt-4"></v-divider>
                    <h3 class="text-h6 mt-6 mb-3">{{ $t('Settings.UiSettingsTab.Colors') }}</h3>
                    <template>
                        <v-container fluid>
                            <v-row class="justify-end" dense>
                            <v-col
                                v-for="(color, name) in editTheme.themeColors.colors"
                                :key="name"
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-card class="pa-2" outlined rounded>
                                    <v-row>
                                        <v-col class="pl-4 align-center">{{ capitalize(name) }}</v-col>
                                        <v-col class="d-flex justify-end">
                                            <v-menu  :close-on-content-click="false">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn v-bind="attrs" v-on="on" :color="color" class="minwidth-0 px-5" small></v-btn>
                                                </template>
                                                <v-color-picker
                                                    :value="color"
                                                    hide-mode-switch
                                                    v-model="editTheme.themeColors.colors[name]"
                                                ></v-color-picker>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                            </v-row>
                        </v-container>
                        </template>
                    <settings-row :title="$t('Settings.UiSettingsTab.DarkMode')" subTitle="beschreibung hier.">
                        <v-switch v-model="editTheme.themeColors.darkMode" hide-details class="mt-0"></v-switch>
                    </settings-row>
                </v-card-text>
                <v-card-actions class="d-flex justify-end">
                    <v-btn text @click="saveTheme(editTheme)">{{ $t('Settings.Save')}}</v-btn>
                    <v-btn text @click="applyTheme(editTheme)">{{ $t('Settings.Apply') }}</v-btn>
                    <v-btn text @click="cancelAddTheme">{{ $t('Settings.Cancel')}}</v-btn>
                </v-card-actions>
            </template>
            <template v-else>
                <v-card-text>
                    <settings-row :title="$t('Settings.UiSettingsTab.Theme')" dynamicSlotWidth="true">
                        <v-btn @click="changeTheme" v-if="boolThemeEdit" small outlined class="ml-3 minwidth-0 px-2 text--secondary">
                            <v-icon small>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn @click="deleteTheme(activeTheme)" v-if="boolThemeDelete" small outlined class="ml-3 minwidth-0 px-2" color="error">
                            <v-icon small>mdi-delete</v-icon>
                        </v-btn>

<!-- Simply bind "disabled" HTML property to a boolean.
Here an exemple with Vuex (select have to be disabled from outside component).

<v-select
    label="label"
    :options="criterias"
    @input="SELECTED_CRITERIAS_ACTION"
    @keyup.enter.stop="SELECTED_CRITERIAS_ACTION"
    :placeholder="pageDescription"
    multiple
    :disabled="this.$store.state.ModuleSearchCriterias.isSearching"
>
    <span slot="no-options">Pas de résulats</span>
</v-select>   
todo: disco-Bug - nach änderung select eine gewisse zeit deaktivieren? -->
                        <v-select v-model="activeTheme" item-text="title" item-value="id" :items="availableThemes" class="ml-3" outlined dense hide-details></v-select>



                        <v-btn @click="addTheme" small outlined class="ml-3 minwidth-0 px-2 text--secondary">
                            <v-icon small>mdi-plus</v-icon>
                        </v-btn>
                    </settings-row>
                    <v-divider v-if="currentTheme.name == 'mainsail'" class="my-2"></v-divider>
                    <settings-row v-if="currentTheme.name == 'mainsail'" :title="$t('Settings.UiSettingsTab.Logo')">
                        <v-btn v-if="logoColor.toLowerCase() !== defaultLogoColor.toLowerCase()" small text class="minwidth-0" @click="logoColor = defaultLogoColor"><v-icon small>mdi-restart</v-icon></v-btn>
                        <v-menu bottom left offset-y :close-on-content-click="false">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-bind="attrs" v-on="on" :color="logoColor" class="minwidth-0 px-5" small></v-btn>
                            </template>
                            <v-color-picker
                                :value="logoColor"
                                hide-mode-switch
                                mode="rgba"
                                @update:color="updateLogoColor"
                            ></v-color-picker>
                        </v-menu>
                    </settings-row>
                    <v-divider v-if="currentTheme.name == 'mainsail'" class="my-2"></v-divider>
                    <settings-row v-if="currentTheme.name == 'mainsail'" :title="$t('Settings.UiSettingsTab.Primary')">
                        <v-btn v-if="primaryColor.toLowerCase() !== defaultPrimaryColor.toLowerCase()" small text class="minwidth-0" @click="primaryColor = defaultPrimaryColor"><v-icon small>mdi-restart</v-icon></v-btn>
                        <v-menu bottom left offset-y :close-on-content-click="false">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-bind="attrs" v-on="on" :color="primaryColor" class="minwidth-0 px-5" small></v-btn>
                            </template>
                            <v-color-picker
                                :value="primaryColor"
                                hide-mode-switch
                                mode="rgba"
                                @update:color="updatePrimaryColor"
                            ></v-color-picker>
                        </v-menu>
                    </settings-row>
                    <v-divider class="my-2"></v-divider>
                    <settings-row :title="$t('Settings.UiSettingsTab.BoolBigThumbnail')" :sub-title="$t('Settings.UiSettingsTab.BoolBigThumbnailDescription')" :dynamicSlotWidth="true">
                        <v-switch v-model="boolBigThumbnail" hide-details class="mt-0"></v-switch>
                    </settings-row>
                    <v-divider class="my-2"></v-divider>
                    <settings-row :title="$t('Settings.UiSettingsTab.DisplayCANCEL_PRINT')" :sub-title="$t('Settings.UiSettingsTab.DisplayCANCEL_PRINTDescription')" :dynamicSlotWidth="true">
                        <v-switch v-model="displayCancelPrint" hide-details class="mt-0"></v-switch>
                    </settings-row>
                    <v-divider class="my-2"></v-divider>
                    <settings-row :title="$t('Settings.UiSettingsTab.DisplayZOffset')" :sub-title="$t('Settings.UiSettingsTab.DisplayZOffsetDescription')" :dynamicSlotWidth="true">
                        <v-switch v-model="displayZOffsetStandby" hide-details class="mt-0"></v-switch>
                    </settings-row>
                    <v-divider class="my-2"></v-divider>
                    <settings-row :title="$t('Settings.UiSettingsTab.ConfirmOnEmergencyStop')" :sub-title="$t('Settings.UiSettingsTab.ConfirmOnEmergencyStopDescription')" :dynamicSlotWidth="true">
                        <v-switch v-model="confirmOnEmergencyStop" hide-details class="mt-0"></v-switch>
                    </settings-row>
                    <v-divider class="my-2"></v-divider>
                    <settings-row :title="$t('Settings.UiSettingsTab.ConfirmOnPowerDeviceChange')" :sub-title="$t('Settings.UiSettingsTab.ConfirmOnPowerDeviceChangeDescription')" :dynamicSlotWidth="true">
                        <v-switch v-model="confirmOnPowerDeviceChange" hide-details class="mt-0"></v-switch>
                    </settings-row>
                </v-card-text>
            </template> 
        </v-card>
    </div>
</template>

<script lang="ts">

import Component from 'vue-class-component'
// import { Mixins, Watch } from 'vue-property-decorator'
import { Mixins, Watch } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import SettingsRow from '@/components/settings/SettingsRow.vue'
import { defaultLogoColor, defaultPrimaryColor, themeTemplate } from '@/store/variables'
import { Debounce } from 'vue-debounce-decorator'
import { GuiStateTheme } from '@/store/gui/types'
import { capitalize } from '@/plugins/helpers'

@Component({
    components: {SettingsRow}
})
export default class SettingsUiSettingsTab extends Mixins(BaseMixin) {
    capitalize = capitalize
    private defaultLogoColor = defaultLogoColor
    private defaultPrimaryColor = defaultPrimaryColor
    private themeTemplate = themeTemplate
    private boolThemeEditor = false
    private boolThemeAdd = false
    private editThemeId: string | null = ''
    private rules = {
        required: (value: string) => value !== '' || 'required',
        // groupUnique: (value: string) => !this.existsGroupName(value) || 'Name already exists',
        themeTitle: (value: string) => /^[a-zA-Z0-9-_ ]*$/.test(value) || 'Invalid title',
        themeDescLength: (value: string) => value.length <= 256 || 'lol...Description is too long' 
    }

    get logoColor() {
        return this.$store.state.gui.theme.logo
    }

    set logoColor(newVal) {
        this.$store.dispatch('gui/saveSetting', {name: 'theme.logo', value: newVal})
    }

    get primaryColor() {
        return this.$store.state.gui.theme.primary
    }

    set primaryColor(newVal) {
        this.$store.dispatch('gui/saveSetting', {name: 'theme.primary', value: newVal})
    }

    get boolBigThumbnail() {
        return this.$store.state.gui.dashboard.boolBigThumbnail
    }

    set boolBigThumbnail(newVal) {
        this.$store.dispatch('gui/saveSetting', {name: 'dashboard.boolBigThumbnail', value: newVal })
    }

    get displayCancelPrint() {
        return this.$store.state.gui.general.displayCancelPrint
    }

    set displayCancelPrint(newVal) {
        this.$store.dispatch('gui/saveSetting', {name: 'general.displayCancelPrint', value: newVal })
    }

    get displayZOffsetStandby() {
        return this.$store.state.gui.general.displayZOffsetStandby
    }

    set displayZOffsetStandby(newVal) {
        this.$store.dispatch('gui/saveSetting', {name: 'general.displayZOffsetStandby', value: newVal })
    }

    get confirmOnEmergencyStop() {
        return this.$store.state.gui.general.confirmOnEmergencyStop
    }

    set confirmOnEmergencyStop(newVal) {
        this.$store.dispatch('gui/saveSetting', {name: 'general.confirmOnEmergencyStop', value: newVal })
    }

    get confirmOnPowerDeviceChange() {
        return this.$store.state.gui.general.confirmOnPowerDeviceChange
    }

    set confirmOnPowerDeviceChange(newVal) {
        this.$store.dispatch('gui/saveSetting', {name: 'general.confirmOnPowerDeviceChange', value: newVal })
    }

    get availableThemes() {
        return this.$store.state.gui.theme.themes.map((theme: any) => theme)
    }

    get activeTheme() {
        return this.$store.state.gui.theme.active
    }

    set activeTheme(newVal) {
        this.$store.dispatch('gui/saveSetting', { name: 'theme.active', value: newVal })
    }

    get currentTheme() {
        return this.$store.getters['gui/getTheme'](this.activeTheme)
    }

    get editTheme() {
        return this.$store.getters['gui/getTheme'](this.editThemeId)
    }
    
    get boolThemeDelete() {
        return this.currentTheme.type == 'default' ? false : true
    }

    get boolThemeEdit() {
        return this.currentTheme.type == 'default' || this.currentTheme.type == 'community' ? false : true
        // return this.currentTheme.type == 'default' ? false : true
    }

    clearColorObject(color: any): string {
        if (typeof color === 'object' && 'hex' in color)
            color = color.hex
        if (color.length > 7)
            color = color.substr(0, 7)
        return color
    }

    async addTheme() {
        this.editThemeId = await this.$store.dispatch('gui/storeTheme', this.themeTemplate)
        this.boolThemeEditor = true
        this.boolThemeAdd = true
    }

    changeTheme() {
        this.editThemeId = this.activeTheme
        this.boolThemeEditor = true
    }

    cancelAddTheme() {
        this.boolThemeEditor = false
        if(this.boolThemeAdd && this.editTheme.title === '') {
            this.deleteTheme(this.editTheme.id)
        }
        this.boolThemeAdd = false
        this.editThemeId = ''
        this.$emit('scrollToTop')
    }

    saveTheme(theme: GuiStateTheme) {
        this.$store.dispatch('gui/saveTheme', theme)
        if(!this.boolThemeAdd) {
            this.$store.dispatch('gui/applyTheme', this.activeTheme)
        }
        
        this.boolThemeAdd = false
        this.boolThemeEditor = false
        this.$emit('scrollToTop')
    }

    //deleteTheme(id: string, newActive: string) {
    deleteTheme(id: string) {
        this.$store.dispatch('gui/deleteTheme', id)
    }

    applyTheme(theme: GuiStateTheme) {
        this.$store.dispatch('gui/saveTheme', theme)
        this.$store.dispatch('gui/applyTheme', theme.id)
    }

    @Watch('activeTheme')
    @Debounce(2500)
    setTheme() {
        this.$store.dispatch('gui/applyTheme', this.activeTheme)
    }

    @Debounce(500)
    updateLogoColor(newVal: any) {
        this.logoColor = this.clearColorObject(newVal)
    }

    @Debounce(500)
    updatePrimaryColor(newVal: any) {
        this.primaryColor = this.clearColorObject(newVal)
    }

}
</script>