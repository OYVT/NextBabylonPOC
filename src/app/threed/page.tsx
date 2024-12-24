'use client'

import Head from "next/head"
import dynamic from "next/dynamic"
import React, { useEffect, useState } from "react"
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/dropdown'
import { Heading } from '@/components/heading'
import { Input, InputGroup } from '@/components/input'
import { Link } from '@/components/link'
import { Select } from '@/components/select'
import { getEvents } from '@/data'
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'

// Load BabylonScene component only on the client side.
const BabylonScene = dynamic(() => import(`@/components/babylon-scene`), { ssr: false })

export default function Threed(props: any) {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => { setLoaded(true) })

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
        {loaded && <BabylonScene className="mt-10" />}
        </>
    )
}