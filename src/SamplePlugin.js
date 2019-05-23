import { FlexPlugin } from 'flex-plugin';
import React from 'react';
import CustomTaskListComponent from './CustomTaskListComponent';
import MyCustomTaskInfoPanelItem from './MyCustomTaskInfoPanelItem';

const PLUGIN_NAME = 'SamplePlugin';
const CCG_APP = 'http://localhost:8081/';

export default class SamplePlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    flex.TaskInfoPanel.Content.add(<MyCustomTaskInfoPanelItem key="extra-info"/>);
    flex.TaskList.Content.add(<CustomTaskListComponent key="demo-component" />, {
      sortOrder: -1,
    });
    flex.CRMContainer.defaultProps.uriCallback = (task) => {
      // return task ? "https://www.bing.com/search?q=" + task.attributes.name : "https://bing.com/";
      let query = "?_dc=" + Date.now();  // disable cache
      console.log("task:");
      console.log(task);
      window.ccgTask = task;    // for simple debugging
      // It used to be `task.attributes.name`.
      // Now apparently it's `task.attributes.from` or `task.attributes.caller`.
      if (task && task.attributes && task.attributes.caller) {
        query += "&name=" + task.attributes.caller;
      }
      return CCG_APP + query;
    };
  }
}
