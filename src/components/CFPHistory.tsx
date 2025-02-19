"use client"

import React, { useEffect, useState } from "react"
import { conferences, fbsTeams, getTeamByName, getTeamLocation } from "@/utils/fbsTeams";
import { getConferenceChampions, getCurrentYear, setConferenceChampions } from "@/utils/localStorage";
import { Card, CardContent, CardHeader } from "./ui/card";
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select } from "./ui/select";
import { Table } from "./ui/table";
import { conferenceChampionRecord } from "@/types/yearRecord";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Bracket, IRenderSeedProps, IRoundProps, ISeedProps, Seed, SeedItem, SeedTeam, SeedTime, SingleLineSeed } from "react-brackets";
import { playoffBowls } from "@/utils/bowlGames";

const CFPHistory: React.FC = () => {
    const [teamScores, setTeamScores] = useState<Number[][]>(Array.from({ length: 11 }, (_, i) => ([0, 0])));
    const [selectedYear, setSelectedYear] = useState(getCurrentYear());

    function changeScore(matchId: number, teamId: number, score: number) {
        var currentScores = [...teamScores];
        currentScores[matchId][teamId] = score;
        setTeamScores(currentScores);
    }

    const rounds: IRoundProps[] = [
        {
            title: 'Round 1',
            seeds: [
                {
                    id: 0,
                    teams: [
                        {
                            seed: 5,
                            name: 'Oklahoma',
                            score: teamScores[0][0]
                        },
                        {
                            seed: 12,
                            name: 'Cincinnati',
                            score: 35
                        },
                    ]
                },
                {
                    id: 1,
                    teams: [
                        {
                            seed: 8,
                            name: 'Washington',
                            score: 24
                        },
                        {
                            seed: 9,
                            name: 'Purdue',
                            score: 13
                        },
                    ]
                },
                {
                    id: 2,
                    teams: [
                        {
                            seed: 6,
                            name: 'Louisiana',
                            score: 27
                        },
                        {
                            seed: 11,
                            name: 'Oklahoma State',
                            score: 16
                        },
                    ]
                },
                {
                    id: 3,
                    teams: [
                        {
                            seed: 7,
                            name: 'USC',
                            score: 22
                        },
                        {
                            seed: 10,
                            name: 'Texas',
                            score: 20
                        },
                    ]
                },
            ]
        },
        {
            title: 'Quarterfinals',
            seeds: [
                {
                    id: 4,
                    teams: [
                        {
                            seed: 5,
                            name: 'Oklahoma',
                            score: 31
                        },
                        {
                            seed: 4,
                            name: 'Coastal Carolina',
                            score: 26
                        },
                    ]
                },
                {
                    id: 5,
                    teams: [
                        {
                            seed: 8,
                            name: 'Washington',
                            score: 41
                        },
                        {
                            seed: 1,
                            name: 'Oregon',
                            score: 28
                        },
                    ]
                },
                {
                    id: 6,
                    teams: [
                        {
                            seed: 6,
                            name: 'Louisiana',
                            score: 31
                        },
                        {
                            seed: 3,
                            name: 'Charlotte',
                            score: 13
                        },
                    ]
                },
                {
                    id: 7,
                    teams: [
                        {
                            seed: 7,
                            name: 'USC',
                            score: 28
                        },
                        {
                            seed: 2,
                            name: 'Virginia Tech',
                            score: 49
                        },
                    ]
                },
            ]
        },
        {
            title: 'Semi-Finals',
            seeds: [
                {
                    id: 8,
                    teams: [
                        {
                            seed: 5,
                            name: 'Oklahoma',
                            score: 21
                        },
                        {
                            seed: 8,
                            name: 'Washignton',
                            score: 31
                        },
                    ]
                },

                {
                    id: 9,
                    teams: [
                        {
                            seed: 6,
                            name: 'Louisiana',
                            score: 17
                        },
                        {
                            seed: 2,
                            name: 'Virginia Tech',
                            score: 59
                        },
                    ]
                }
            ]
        },
        {
            title: 'National Championship',
            seeds: [
                {
                    id: 10,
                    teams: [
                        {
                            seed: 2,
                            name: 'Virginia Tech',
                            score: 38
                        },
                        {
                            seed: 8,
                            name: 'Washington',
                            score: 3
                        }
                    ]
                }
            ]
        }
    ]

    const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }: IRenderSeedProps) => {
        const isLineConnector = roundIndex === 0 ? true : false;
        const Wrapper = isLineConnector ? SingleLineSeed : Seed;

        return (
            <Wrapper mobileBreakPoint={breakpoint} style={{ fontSize: 12, marginBottom: '20px' }}>
                <SeedItem>
                    <div>
                        <SeedTeam>
                            {seed.teams[0].seed + ' '}{seed.teams[0].name}
                            <Input className="text-center w-11"
                                // value={teamScores ? teamScores[seed.id as number][0].toString() : ''}
                                value={seed.teams[0].score}
                                onChange={(e) => {
                                    changeScore(seed.id as number, 0, parseInt(e.target.value))
                                }}
                            />
                        </SeedTeam>
                        <div style={{ height: 1, backgroundColor: '#707070' }}></div>
                        <SeedTeam>
                            {seed.teams[1].seed + ' '}{seed.teams[1].name}
                            <Input className="text-center w-11"
                                value={teamScores ? teamScores[seed.id as number][1].toString() : ''}
                                onChange={(e) => {
                                    changeScore(seed.id as number, 1, parseInt(e.target.value))
                                }}
                            />
                        </SeedTeam>
                    </div>
                </SeedItem>
                <SeedTime> <div style={{ height: 40 }}>
                    {
                        roundIndex === 0 ?
                            getTeamLocation(seed.teams[0].name || '') :
                            <Select
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Test" />
                                </SelectTrigger>
                                <SelectContent>
                                    {playoffBowls.map((bowl) => (
                                        <SelectItem key={bowl} value={bowl}>{bowl}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                    }
                </div>
                </SeedTime>
            </Wrapper>
        )
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-center">CFP History</h1>
            <Card>
                <CardContent>
                    <Bracket rounds={rounds} renderSeedComponent={CustomSeed} />
                </CardContent>
            </Card>
        </div>
    );
}

export default CFPHistory