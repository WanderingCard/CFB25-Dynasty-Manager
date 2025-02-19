"use client"

import React, { useEffect, useState } from "react"
import { conferences, fbsTeams } from "@/utils/fbsTeams";
import { getConferenceChampions, getCurrentYear, setConferenceChampions } from "@/utils/localStorage";
import { Card, CardContent, CardHeader } from "./ui/card";
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select } from "./ui/select";
import { Table } from "./ui/table";
import { conferenceChampionRecord } from "@/types/yearRecord";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const ConferenceChampionsHistory: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState<number>(getCurrentYear());
    const [conferenceChampions, setDisplayedChampions] = useState<conferenceChampionRecord[]>(getConferenceChampions(selectedYear).champions);
    const [errors, setError] = useState<String>('');
    const [edited, setEdited] = useState<boolean>(false);

    useEffect(() => {
        let conferenceRecords = getConferenceChampions(selectedYear);
        if (conferenceRecords.champions.length === 0) {
            const newRecord: conferenceChampionRecord[] = Array.from({ length: conferences.length }, (_, i) => ({
                conference: conferences[i],
                champion: '',
                ccg: true
            }))
            setDisplayedChampions(newRecord);
        } else {
            setDisplayedChampions(conferenceRecords.champions)
        }
    }, [selectedYear])

    function getConferenceRecord(conference: string): conferenceChampionRecord | undefined {
        let conferenceRecord = conferenceChampions.find((record) => record.conference === conference);
        return conferenceRecord;
    }

    function changeConferenceRecord(conference: string, record: conferenceChampionRecord): void {
        const conferenceIndex = conferenceChampions.findIndex((element) => element.conference === conference);
        let editChampions = [...conferenceChampions]; // Create a new array

        if (conferenceIndex === -1) {
            editChampions.push(record);
        } else {
            editChampions[conferenceIndex] = record;
        }

        console.log(editChampions);
        setDisplayedChampions(editChampions); // Set the new array as the state
        setEdited(true);
    }

    function setConfChamp(conference: string, champion: string): void {
        let currentRecord = getConferenceRecord(conference);
        if (currentRecord !== undefined) {
            currentRecord = { ...currentRecord, champion: champion }
            changeConferenceRecord(conference, currentRecord);
        } else {
            console.log('Error: Conference Does not exist')
        }
    }

    function setCCG(conference: string, ccgExists: string): void {
        let currentRecord = getConferenceRecord(conference);
        if (currentRecord !== undefined) {
            currentRecord = { ...currentRecord, ccg: ccgExists === "Yes" ? true : false }
            changeConferenceRecord(conference, currentRecord);
        } else {
            console.log('Error: Conference Does not exist')
        }
    }

    function setCCGScore(conference: string, score: string): void {
        let currentRecord = getConferenceRecord(conference);
        if (currentRecord !== undefined) {
            currentRecord = { ...currentRecord, ccgScore: score }
            changeConferenceRecord(conference, currentRecord);
        } else {
            console.log('Error: Conference Does not exist')
        }
    }

    function setRunnerUp(conference: string, runnerUp: string): void {
        let currentRecord = getConferenceRecord(conference);
        if (currentRecord !== undefined) {
            currentRecord = { ...currentRecord, runnerUp: runnerUp }
            changeConferenceRecord(conference, currentRecord);
        } else {
            console.log('Error: Conference Does not exist')
        }
    }

    function saveChanges(): void {
        setConferenceChampions(selectedYear, conferenceChampions);
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-center">Conference Champions</h1>
            <Card>
                <CardHeader className="text-xl font-semibold">
                    <div className="flex justify-between items-center">
                        <span>Conference Champions for: {selectedYear}</span>
                        <Select
                            value={selectedYear.toString()}
                            onValueChange={(value: string) => setSelectedYear(parseInt(value))}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Year" />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({ length: getCurrentYear() - 2024 + 1 }, (_, i) => 2024 + i).map(year => (
                                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <thead>
                            <tr>
                                <th>Conference</th>
                                <th>Champion</th>
                                <th>CCG?</th>
                                <th>Final Score</th>
                                <th>Runner-up</th>
                            </tr>
                        </thead>
                        <tbody>
                            {conferences.map((conference) => (
                                <tr>
                                    <td className="text-center">{conference}</td>
                                    <td className="text-center">
                                        <Select
                                            value={getConferenceRecord(conference)?.champion || ''}
                                            onValueChange={(value) => setConfChamp(conference, value)}
                                        >
                                            <SelectTrigger className="w-full text-center">
                                                <SelectValue placeholder="--- Select Team ---" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem key={'tbd'} value="tbd">--- Select Team ---</SelectItem>
                                                {fbsTeams.filter((team) => team.conference === conference).map((team) => (
                                                    <SelectItem key={team.name} value={team.name}>{team.name}</SelectItem>
                                                ))}
                                                <SelectItem key={'none'} value="none">No Champion</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </td>
                                    <td className="text-center">
                                        <Select
                                            value={getConferenceRecord(conference)?.ccg === true ? "Yes" : "No"}
                                            onValueChange={(value) => setCCG(conference, value)}
                                        ><SelectTrigger className="w-full text-center">
                                                <SelectValue placeholder="Yes" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem key={'yes'} value="Yes">Yes</SelectItem>
                                                <SelectItem key={'no'} value="No">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </td>
                                    <td className="text-center w-20">
                                        <Input 
                                            value={getConferenceRecord(conference)?.ccgScore || ''}
                                            onChange={(e) => setCCGScore(conference, e.target.value)}
                                        />
                                    </td>
                                    <td className="text-center">
                                        <Select
                                            value={getConferenceRecord(conference)?.runnerUp || ''}
                                            onValueChange={(value) => setRunnerUp(conference, value)}
                                        >
                                            <SelectTrigger className="w-full text-center">
                                                <SelectValue placeholder="--- Select Team ---" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem key={'tbd'} value="tbd">--- Select Team ---</SelectItem>
                                                {fbsTeams.filter((team) => team.conference === conference).map((team) => (
                                                    <SelectItem key={team.name} value={team.name}>{team.name}</SelectItem>
                                                ))}
                                                <SelectItem key={'none'} value="none">No Runner-up</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardContent>
            </Card>
            <div className="flex justify-center">
                <Button onClick={() => saveChanges()}>Save Champions</Button>
            </div>
        </div>
    );
}

export default ConferenceChampionsHistory