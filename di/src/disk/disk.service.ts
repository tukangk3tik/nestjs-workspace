import { Injectable } from '@nestjs/common';
import { PowerService } from '../power/power.service';

@Injectable()
export class DiskService {
  constructor(private powerService: PowerService) {}

  read(): String {
    console.log('Disk is reading, using 20 watts of power...');
    this.powerService.supplyPower(20);
    return 'This is the disk data';
  }
}
