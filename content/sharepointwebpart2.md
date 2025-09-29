---
title: "SharePoint Web Part (Part 2)"
description: "How to create and publish a SharePoint Web Part"
date: "2021-02-14"
categories: ["React","Microsoft 365","TypeScript"]
tags: []
slug: "sharepointwebpart2"
image: "/assets/images/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png"
---



## Adding the big calendar

npm is the package manager for the Node JavaScript platform. 

The npmjs web site is a repository of reusable software components.

react-big-calendar is an events calendar  component built for React.

[https://www.npmjs.com/package/react-big-calendar](https://www.npmjs.com/package/react-big-calendar)

To add the react-big-calendar component to our SharePoint Web Part solution we run this command:

$ npm i react-big-calendar


## Update the Calendar Function Component

This is how to update the Web Part's Calendar Component to include react-big-calendar.

Notice that we are again using React's [useEffect and useState hooks](reactusestateuseeffect.html).


## Pnp react-calendar sample

SharePoint provides a [REST API](restapiservice.html).

The [pnp react-calendar sample project](https://github.com/pnp/sp-dev-fx-webparts/tree/master/samples/react-calendar) uses an "sp-services" class to hold all of the code needed to fetch Calendar list items from the SharePoint site via SharePoint's REST API.

We can use the same approach:


## workbench.aspx

The code above assumes that your SharePoint site has a Calendar list named "Calendar".

The Local Workbench used for Web Part testing does not have a Calendar list, so to test the Web Part we need to navigate to the workbench page in a SharePoint site that does have a Calendar list (eg. https://haddleyoffice365.sharepoint.com/sites/AllStaff/_layouts/15/workbench.aspx).

![](/assets/images/sharepointwebpart2/screen-shot-2021-02-14-at-2.53.35-pm-1900x1357.png)
*Example Team Site Calendar with sample events*

![](/assets/images/sharepointwebpart2/screen-shot-2021-02-14-at-2.56.27-pm-1900x1357.png)
*Calendar Web Part icon in /layouts/15/workbench.aspx page*

![](/assets/images/sharepointwebpart2/screen-shot-2021-02-14-at-2.56.52-pm-1900x1213.png)
*Calendar Web Part running in /layouts/15/workbench.aspx page displaying sample events*


## Packaging and deploying

These commands can be used to create a .sppkg package

gulp clean
gulp bundle --ship
gulp package-solution --ship

The Web Part can then be deployed by copying the .sppkg package to the SharePoint tenant's app catalog site.

![](/assets/images/sharepointwebpart2/screen-shot-2021-02-14-at-3.12.16-pm-1900x1209.png)
*Copying the .sppkg package to the SharePoint app catalog*

![](/assets/images/sharepointwebpart2/screen-shot-2021-02-14-at-3.13.38-pm-1900x1213.png)
*Adding the Calendar Web Part to a Sharepoint page*

![](/assets/images/sharepointwebpart2/screen-shot-2021-02-14-at-3.13.52-pm-1900x1215.png)
*An opportunity to set the Calendar Web Part properties*

![](/assets/images/sharepointwebpart2/screen-shot-2021-02-14-at-3.14.12-pm-1900x1208.png)
*The Calendar Web Part running in the SharePoint page (in Month mode)*

![](/assets/images/sharepointwebpart2/screen-shot-2021-02-14-at-3.14.29-pm-1900x1213.png)
*The Calendar Web Part running in the SharePoint page (in Agenda mode)*

![](/assets/images/sharepointwebpart2/image0-1242x2208.png)
*The Calendar Web Part running in the iOS SharePoint app (in Month mode)*

![](/assets/images/sharepointwebpart2/image0-2-1242x2208.png)
*The Calendar Web Part running in the iOS SharePoint app (in Agenda mode)*


## Calendar.tsx

```typescript
import * as React from 'react';
import { ICalendarProps } from './ICalendarProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { FunctionComponent } from 'react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react';
import { useEffect, useState } from 'react';
import spservices from '../../../services/spservices';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import * as moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const Calendar: FunctionComponent<ICalendarProps> =
  ({ description, context }: { description: string, context: WebPartContext }) => {

    const [busy, setBusy] = useState(true)
    const [events, setEvents] = useState([])

    useEffect(() => {
      (async () => {
        await refreshEvents()
      })();
    }, [])

    const refreshEvents = async () => {
      try {
        setBusy(() => true);
        const spService = new spservices(context);
        const calendarEvents = await spService.getEvents();
        setEvents(() => calendarEvents);
        setBusy(() => false);
      }
      catch (error) {
        setBusy(() => false);
      }
    }

    const deleteEvent = async (id: number) => {
      try {
        const spService = new spservices(context);
        await spService.deleteEvent(id);
        const calendarEvents = await spService.getEvents();
        setEvents(() => calendarEvents);
      }
      catch (error) {
        setBusy(() => false);
      }
    }

    const localizer = momentLocalizer(moment)

    return (
      (busy)
        ? (
          <Spinner size={SpinnerSize.large} label="Loading..." />
        )
        : (
          <>
            <h1>{escape(description)}</h1>
            <BigCalendar
              defaultDate={moment().startOf('day').toDate()}
              localizer={localizer}
              events={events}
              views={{ day: true, week: true, month: true, agenda: true }}
              style={{ height: 500 }}
              components={{
                eventWrapper: ({ event, children }) => (
                  <div
                    onContextMenu={
                      e => {
                        alert(`Will delete ${event.title} (${event.id})!`);
                        deleteEvent(event.id);
                        e.preventDefault();
                      }
                    }
                  >
                    {children}
                  </div>
                )
              }}
            />
          </>
        )
    )
  }

export default Calendar
```

## sp-services.ts

```typescript
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/regional-settings";
import * as moment from 'moment';

export default class spservices {

    constructor(private context: WebPartContext) {
        sp.setup({
            spfxContext: this.context
        });
    }

    public async getLocalTime(date: string | Date): Promise<string> {
        try {
            const localTime = await sp.web.regionalSettings.timeZone.utcToLocalTime(date);
            return localTime;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async getEvents(): Promise<any[]> {
        try {

            const items: any[] = await sp.web.lists.getByTitle("Calendar").items.get();

            const promises = items.map(event =>
                (async (item) => {

                    let start: Date
                    let end: Date

                    if (item.fAllDayEvent) {

                        // ignore timezone for all day events
                        start = new Date(item.EventDate.slice(0, -1))
                        end = new Date(item.EndDate.slice(0, -1))
                        

                    } else {

                        const start1 = await this.getLocalTime(item.EventDate)
                        start = new Date(start1)

                        const end1 = await this.getLocalTime(item.EndDate)
                        end = new Date(end1)

                    }

                    return ({
                        id: item.Id,
                        title:item.Title,
                        allDay: item.fAllDayEvent,
                        start: start,
                        end: end,
                    })

                })(event))

            return await (Promise.all(promises))

        } catch (error) {
            return Promise.reject(error)
        }
    }

    public async deleteEvent(id: number) {
        try {
            if (sp) {
                const list = sp.web.lists.getByTitle("Calendar");
                await list.items.getById(id).delete();
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }

}
```
## References

- [SharePoint Framework web part, Teams tab, personal app, app page samples](https://github.com/pnp/sp-dev-fx-webparts)