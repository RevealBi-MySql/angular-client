import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ISimpleComboSelectionChangingEventArgs } from 'igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { DashboardNames } from '../models/reveal-server/dashboard-names';
import { StateService } from '../services/state.service';
import { RevealServerService } from '../services/reveal-server.service';

declare var $: any;

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroy$: Subject<void> = new Subject<void>();
  public selectedDashboard: string = '';
  public revealServerDashboardNames: DashboardNames[] = [];
  
  @ViewChild('revealView') el!: ElementRef;

  constructor(
    private revealServerService: RevealServerService,
    protected stateService: StateService,
  ) {}

  ngOnInit() {
    this.revealServerService.getDashboardNamesList().pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        this.revealServerDashboardNames = data;

        if (this.revealServerDashboardNames.length > 0) {
          this.selectedDashboard = this.revealServerDashboardNames[0].dashboardTitle;
          this.loadDashboard(this.selectedDashboard);
        }
      }
    );
  }

  async ngAfterViewInit() {
    if (this.selectedDashboard) {
      this.loadDashboard(this.selectedDashboard);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public async singleSelectComboSelectionChanging(event: ISimpleComboSelectionChangingEventArgs) {
    this.selectedDashboard = event.newValue as string;
    await this.loadDashboard(this.selectedDashboard);
  }

  private async loadDashboard(dashboardName: string) {
    let dashboard = await $.ig.RVDashboard.loadDashboard(dashboardName);
    var revealView = new $.ig.RevealView(this.el.nativeElement);
    revealView.interactiveFilteringEnabled = true;
    revealView.dashboard = dashboard;
  }
}
