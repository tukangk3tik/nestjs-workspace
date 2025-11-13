import { Injectable } from '@nestjs/common';
import { PowerService } from '../power/power.service';

@Injectable()
export class CpuService {
  constructor(private powerService: PowerService) {}

  compute(): String {
    this.powerService.supplyPower(50);
    console.log('CPU is computing, using 50 watts of power...');
    return 'This is the CPU result';
  }
}
