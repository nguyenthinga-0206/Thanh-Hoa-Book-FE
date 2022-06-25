import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class TranslatesService {

  constructor(private translateService: TranslateService) {
    this.translateService.use('ta');
  }

  changeLanguage(type: string) {
    this.translateService.use(type);
  }
}
