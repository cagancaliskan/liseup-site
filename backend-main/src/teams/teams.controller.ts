import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Auth } from '../auth/decorators/auth-type.decorator';
import { Role } from '../entities/role';
import { TeamsRepository } from '../persistence';
import type { NewTeam, NewTeamMember, NewProject } from '../persistence';

@Controller('/api/teams')
export class TeamsController {
  constructor(private readonly teamsRepository: TeamsRepository) {}

  // ── Teams ──────────────────────────────────────────────────────────────────

  @Auth()
  @Get('teams/:id')
  findTeamById(@Param('id') id: string) {
    return this.teamsRepository.findTeamById(id);
  }

  @Auth(Role.User, Role.Mentor)
  @Post('teams')
  createTeam(@Body() data: NewTeam) {
    return this.teamsRepository.createTeam(data);
  }

  @Auth(Role.User, Role.Mentor, Role.Admin)
  @Patch('teams/:id')
  updateTeam(@Param('id') id: string, @Body() data: Partial<NewTeam>) {
    return this.teamsRepository.updateTeam(id, data);
  }

  @Auth(Role.Admin)
  @Delete('teams/:id')
  deleteTeam(@Param('id') id: string) {
    return this.teamsRepository.deleteTeam(id);
  }

  // ── Team Members ───────────────────────────────────────────────────────────

  @Auth()
  @Get('teams/:id/members')
  findMembersByTeamId(@Param('id') id: string) {
    return this.teamsRepository.findMembersByTeamId(id);
  }

  @Auth(Role.User, Role.Mentor, Role.Admin)
  @Post('teams/:id/members')
  addMember(@Param('id') teamId: string, @Body() data: NewTeamMember) {
    return this.teamsRepository.addMember(data);
  }

  @Auth(Role.User, Role.Mentor, Role.Admin)
  @Patch('teams/:teamId/members/:userId')
  updateMemberStatus(
    @Param('teamId') teamId: string,
    @Param('userId') userId: string,
    @Body('status') status: number,
  ) {
    return this.teamsRepository.updateMemberStatus(userId, teamId, status);
  }

  @Auth(Role.User, Role.Mentor, Role.Admin)
  @Delete('teams/:teamId/members/:userId')
  removeMember(
    @Param('teamId') teamId: string,
    @Param('userId') userId: string,
  ) {
    return this.teamsRepository.removeMember(userId, teamId);
  }

  // ── Projects ───────────────────────────────────────────────────────────────

  @Auth()
  @Get('projects/:id')
  findProjectById(@Param('id') id: string) {
    return this.teamsRepository.findProjectById(id);
  }

  @Auth(Role.User, Role.Mentor)
  @Post('projects')
  createProject(@Body() data: NewProject) {
    return this.teamsRepository.createProject(data);
  }

  @Auth(Role.User, Role.Mentor, Role.Admin)
  @Patch('projects/:id')
  updateProject(@Param('id') id: string, @Body() data: Partial<NewProject>) {
    return this.teamsRepository.updateProject(id, data);
  }

  @Auth(Role.Admin)
  @Delete('projects/:id')
  deleteProject(@Param('id') id: string) {
    return this.teamsRepository.deleteProject(id);
  }
}
