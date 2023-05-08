import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NamesOfAllahComponent } from './names-of-allah/names-of-allah.component';
import { MyVoiceComponent } from './my-voice/my-voice.component';
import { RecordingComponent } from './recording/recording.component';

const routes: Routes = [
  { path: '', component: NamesOfAllahComponent },
  { path: 'home', component: NamesOfAllahComponent },
  { path: 'my-voice', component: MyVoiceComponent },
  { path: 'recording', component: RecordingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
