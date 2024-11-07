import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ISimpleComboSelectionChangingEventArgs } from 'igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { EmployeesType } from '../models/northwind/employees-type';
import { NorthwindService } from '../services/northwind.service';
import { Renderer2 } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroy$: Subject<void> = new Subject<void>();
  public selectedEmployee?: number;
  public northwindEmployees: EmployeesType[] = [];
  public headers: { [key: string]: any } = {};

  @ViewChild('revealView') el!: ElementRef;

  constructor(
    private northwindService: NorthwindService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.northwindService.getEmployees().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.northwindEmployees = data,
      error: (_err: any) => {
        console.error('Failed to fetch employees', _err);
        this.northwindEmployees = [];
      }
    });

    $.ig.RevealSdkSettings.setAdditionalHeadersProvider((url: any) => {
      return this.headers;
    });
  }

  ngAfterViewInit(): void {
    const revealView = new $.ig.RevealView(this.el.nativeElement);
    revealView.startInEditMode = true;
    revealView.interactiveFilteringEnabled = true;

    revealView.onDataSourcesRequested = (callback: any) => {
      this.headers["x-header-one"] = this.selectedEmployee;

      const sqlDs = new $.ig.RVMySqlDataSource();
      sqlDs.id = "sqlServer";
      sqlDs.title = "MySql Server Data Source";
      sqlDs.subtitle = "Full Northwind Database";

      const dsi1 = new $.ig.RVMySqlDataSourceItem(sqlDs);
      dsi1.id = "customer_orders";
      dsi1.title = "Customer Orders";
      dsi1.subtitle = "Custom Set of Orders Table";

      const dsi2 = new $.ig.RVMySqlDataSourceItem(sqlDs);
      dsi2.id = "customer_orders_details";
      dsi2.title = "Customer Orders Details";
      dsi2.subtitle = "Custom Query to Customers_Orders_Details View";

      const dsi3 = new $.ig.RVMySqlDataSourceItem(sqlDs);
      dsi3.id = "sp_customer_orders";
      dsi3.title = "Stored Procedure - Customer_Orders";
      dsi3.subtitle = "@Parameter: Customer";

      callback(new $.ig.RevealDataSources([sqlDs], [dsi1, dsi2, dsi3], false));
    };
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public singleSelectComboSelectionChanging(event: ISimpleComboSelectionChangingEventArgs) {
    this.selectedEmployee = event.newValue as number;
  }
}