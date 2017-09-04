
// temporary fix https://github.com/PointInside/ng2-toastr/issues/78
import {ApplicationRef, ComponentFactoryResolver, Injectable, NgZone} from '@angular/core';
import {ToastOptions, ToastsManager} from 'ng2-toastr';
@Injectable()
export class CustomToastOptions extends ToastsManager {
  constructor(componentFactoryResolver: ComponentFactoryResolver, ngZone: NgZone, appRef: ApplicationRef, options: ToastOptions) {
    super(componentFactoryResolver, ngZone, appRef, Object.assign(options, {
      animate: 'fade',
      positionClass: 'toast-top-center'
    }));
  }
}
