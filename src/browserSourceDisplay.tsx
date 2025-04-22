import React from 'react';

import { NetworkState } from './constants/enum/networkState';
import { DefaultPatreonSettings } from './constants/designPalette';
import { patreonTestData } from './constants/testData/patreonTestData';
import { ResultWithValue } from './contracts/results/ResultWithValue';
import { PatreonViewModel } from './contracts/generated/ViewModel/patreonViewModel';
import { anyObject } from './helper/typescriptHacks';
import { setDocumentTitle } from './helper/documentHelper';
import { PatreonDisplaySwitcher } from './components/patreon/patreonDisplaySwitcher';

interface IProps { }

interface IState {
  patreonNetworkState: NetworkState;
  patronVm: PatreonViewModel;
}
export class BrowserSourceDisplay extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      patreonNetworkState: NetworkState.Pending,
      patronVm: anyObject,
    };
  }

  componentDidMount() {
    this.getPatronSettings();
    setDocumentTitle('Patreon Display');
  }

  getPatronSettings = async () => {
    let patronsResult: ResultWithValue<PatreonViewModel> = anyObject;
    if (window.location.href.includes('3000')) {
      patronsResult = patreonTestData();
    } else {
      try {
        const jsonResponse = await fetch('./patreonConfig.json')
        const data = await jsonResponse.json();
        patronsResult = {
          isSuccess: true,
          value: data,
          errorMessage: ''
        }
      }
      catch (ex) {
        patronsResult = {
          isSuccess: false,
          value: anyObject,
          errorMessage: ex?.toString?.() ?? 'unknown exception',
        }
      }
    }

    if (!patronsResult.isSuccess) {
      this.setState(() => {
        return {
          patreonNetworkState: NetworkState.Error,
        }
      });
      return;
    }

    this.setState(() => {
      return {
        patronVm: {
          ...patronsResult.value,
          settings: patronsResult?.value?.settings ?? DefaultPatreonSettings
        },
        patreonNetworkState: NetworkState.Success,
      }
    });
  }

  render() {
    if (this.state.patreonNetworkState !== NetworkState.Success) return <span></span>

    return (
      <div id="display" className="height-100vh" draggable={false}>
        <PatreonDisplaySwitcher patronVm={this.state.patronVm} />
      </div>
    );
  }
}
