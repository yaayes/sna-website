<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('app:prune-aidant-adhesion-drafts')->daily();
Schedule::command('app:prune-stale-pending-form-records')->daily();
