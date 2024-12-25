import Head from "next/head"
import React, { useEffect, useState } from "react"
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input, InputGroup } from '@/components/input'
import { Select } from '@/components/select'
import { BabylonView } from '@/components/babylon-scene'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'


export default function Threed(props: any) {
    return (
        <>
        <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-sm:w-full sm:flex-1">
            <Heading>THREE D</Heading>
            <div className="mt-4 flex max-w-xl gap-4">
                <div className="flex-1">
                <InputGroup>
                    <MagnifyingGlassIcon />
                    <Input name="search" placeholder="Search events&hellip;" />
                </InputGroup>
                </div>
                <div>
                <Select name="sort_by">
                    <option value="name">Sort by name</option>
                    <option value="date">Sort by date</option>
                    <option value="status">Sort by status</option>
                </Select>
                </div>
            </div>
            </div>
            <Button>Create event</Button>
        </div>        
        <Head>
            <title>3 Designer</title>
        </Head>
        <BabylonView className="mt-10 w-full" />
        </>
    )
}