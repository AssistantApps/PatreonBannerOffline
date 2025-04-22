import classNames from 'classnames';
import React from 'react';

import { PatreonTile } from '../../components/patreon/patreonTile';
import { DesignPalette } from '../../constants/designPalette';
import { PatreonItemViewModel } from '../../contracts/generated/ViewModel/patreonItemViewModel';

import './_patreonVerticalList.scss';

interface IVerticalListRequiredSettingsProps {
    foregroundColour: string;
    backgroundColour: string;
    backgroundOpacity: number;
    verticalListSpeed: number;
    isProfilePicRounded?: boolean;
    profilePicRoundedValue: number;
}

interface IProps {
    campaignUrl: string;
    patrons: Array<PatreonItemViewModel>;
    settings: IVerticalListRequiredSettingsProps;
    isBrowserSource?: boolean;
    isReversed?: boolean;
}

interface IState {
    isReversed: boolean;
}

export class PatreonVerticalList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const isReversed = (this.props.isReversed ?? false);

        this.state = {
            isReversed,
        };
    }

    render() {
        let patrons = this.props.patrons ?? [];
        const verticalListSpeedDefault = this.props.isBrowserSource === true
            ? DesignPalette.verticalListSpeedDefault
            : DesignPalette.verticalListSpeedDefault;

        let {
            foregroundColour, backgroundColour,
            backgroundOpacity = DesignPalette.backgroundOpacityDefault,
            verticalListSpeed = verticalListSpeedDefault,
            isProfilePicRounded = DesignPalette.isProfilePicRounded,
            profilePicRoundedValue = DesignPalette.profilePicRoundedValue,
        } = this.props.settings;

        let realValue = 1500;
        if (verticalListSpeed === 0) verticalListSpeed = verticalListSpeedDefault;
        const selectedValue = DesignPalette.verticalListSpeedTicks.find(t => t.value === (+verticalListSpeed));
        if (selectedValue != null && selectedValue.realValue != null) realValue = (+selectedValue.realValue);

        const backgroundStyleObj = {
            backgroundColor: backgroundColour,
            opacity: backgroundOpacity / 100,
        };

        const listStyleObj = {
            animationName: 'none',
            animationDuration: `${patrons.length * realValue}ms`,
        };

        let addPatreonStaticButton = false;
        let addPatreonHoverButton = true;
        if (patrons.length > 5) {
            (listStyleObj.animationName as any) = undefined;
        } else {
            addPatreonStaticButton = true;
        }

        if (this.props.isBrowserSource === true) {
            addPatreonStaticButton = false;
            addPatreonHoverButton = false;
        }

        const classes = classNames('no-scrollbar', { 'bg-hover': (addPatreonStaticButton === false && addPatreonHoverButton) });
        return (
            <>
                <div id="patreonVerticalList" className={classes}>
                    <div className="patreon-container-background" style={backgroundStyleObj}></div>
                    <div className="list" style={listStyleObj}>
                        {
                            patrons != null &&
                            patrons.map((item: PatreonItemViewModel) => (
                                <PatreonTile key={`list1-${item.name}`} {...item} foregroundColour={foregroundColour}
                                    isProfilePicRounded={isProfilePicRounded} profilePicRoundedValue={profilePicRoundedValue}
                                />
                            ))
                        }
                    </div>
                    {
                        (patrons.length > 5) &&
                        <div className="list" style={listStyleObj}>
                            {
                                patrons != null &&
                                patrons.map((item: PatreonItemViewModel) => (
                                    <PatreonTile key={`list2-${item.name}`} {...item} foregroundColour={foregroundColour}
                                        isProfilePicRounded={isProfilePicRounded} profilePicRoundedValue={profilePicRoundedValue}
                                    />
                                ))
                            }
                        </div>
                    }
                </div>
            </>
        );
    }
}

