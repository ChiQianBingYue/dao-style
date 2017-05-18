// es6 polyfill
import 'core-js/fn/array/find-index';

import daoCallout from './components/dao-callout';
import daoDialog from './components/dao-dialog';
import daoDropdown from './components/dao-dropdown';
import { daoInput, daoEditableInput } from './components/dao-input';
import daoPopover from './components/dao-popover';
import { daoProgress, daoProgressPulsing, daoProgressStacked } from './components/dao-progress';
import daoSteps from './components/dao-steps';
import daoSwitch from './components/dao-switch';
import daoSettingLayout from './components/dao-setting-layout';
import daoTab from './components/dao-tab';
import daoTooltip from './components/dao-tooltip';

const daoStyle = {
  daoCallout,
  daoDialog,
  daoDialogStep: daoDialog.Step,
  daoDropdown,
  daoDropdownMenu: daoDropdown.Menu,
  daoDropdownItem: daoDropdown.Item,
  daoEditableInput,
  daoInput,
  daoPopover,
  daoProgress,
  daoProgressStacked,
  daoProgressPulsing,
  daoSteps,
  daoStep: daoSteps.step,
  daoSubstep: daoSteps.substep,
  daoStepContent: daoSteps.content,
  daoSwitch,
  daoSettingLayout,
  daoSettingSection: daoSettingLayout.Section,
  daoSettingItem: daoSettingLayout.Item,
  daoTab,
  daoTabItem: daoTab.Item,
  daoTooltip,
};

function install(Vue) {
  Object.keys(daoStyle).forEach((key) => {
    Vue.component(key, daoStyle[key]);
  });
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = Object.assign(daoStyle, { install }); // eslint-disable-line no-undef
