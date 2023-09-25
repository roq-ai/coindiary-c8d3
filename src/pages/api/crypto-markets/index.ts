import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import {
  authorizationValidationMiddleware,
  errorHandlerMiddleware,
  notificationHandlerMiddleware,
} from 'server/middlewares';
import { cryptoMarketValidationSchema } from 'validationSchema/crypto-markets';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getCryptoMarkets();
    case 'POST':
      return createCryptoMarket();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCryptoMarkets() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.crypto_market
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'crypto_market'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createCryptoMarket() {
    await cryptoMarketValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.crypto_portfolio?.length > 0) {
      const create_crypto_portfolio = body.crypto_portfolio;
      body.crypto_portfolio = {
        create: create_crypto_portfolio,
      };
    } else {
      delete body.crypto_portfolio;
    }
    if (body?.crypto_watchlist?.length > 0) {
      const create_crypto_watchlist = body.crypto_watchlist;
      body.crypto_watchlist = {
        create: create_crypto_watchlist,
      };
    } else {
      delete body.crypto_watchlist;
    }
    const data = await prisma.crypto_market.create({
      data: body,
    });
    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
